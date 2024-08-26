import { NextFunction, Request, Response } from "express";

import { createClient } from 'redis';
const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await redisClient.connect(); // Ensure the client is connected
})();


interface IncomingHttpHeaders {
    [Headers: string]: string | string[] | undefined;
}

interface CustomRequest extends Request {
    token: string;
    email?: string;
    grantId?: string;
}

export const checkAuthToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    let tokenParts;
    try {
        const headers = req.headers as IncomingHttpHeaders;
        const token = headers.authorization;

        if (!redisClient.isOpen) {
            await redisClient.connect(); // Reconnect if the client is closed
        }

        if (!token) {
            return res.status(401).send({ ok: false, message: 'No token provided' });

        } else {
            //    Split the bearer token
            if (typeof token === "string") {
                tokenParts = token.split(' ')
            }

            // @ts-ignore
            if (tokenParts.length !== 2) {
                console.log('Invalid token-1');
                return res.status(401).send({ ok: false, message: 'Invalid token' });
            }
            // @ts-ignore
            if (tokenParts && !await redisClient.hExists(tokenParts[1], 'email')) {
                console.log('Invalid token-2');
                return res.status(401).send({ ok: false, message: 'Invalid token' });
            }

            // @ts-ignore
            req.token = tokenParts[1];
            req.email = await redisClient.hGet(req.token, 'email');
            req.grantId = await redisClient.hGet(req.token, 'grantId');
        }
        next();
    } catch (error) {
        console.error('Error checking auth token:', error);
        return res.status(500).send({ ok: false, message: 'Internal Server Error' });
    }
};