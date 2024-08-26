import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await redisClient.connect(); // Ensure the client is connected
})();

export const storeToken = async (email: string, token: string, grantId: string) => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect(); // Reconnect if the client is closed
        }
        console.log('Storing token:', token);
        console.log('Storing email:', email);
        console.log('Storing grantId:', grantId);
        await redisClient.hSet(token, {
            email: email,
            token: token,
            grantId: grantId
        });
    } catch (error) {
        console.error('Error storing token:', error);
    }
}

export const getToken = async (token: any) => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect(); // Reconnect if the client is closed
        }
        const storedToken = await redisClient.hGet(token, 'email');
        return storedToken;
    } catch (error) {
        console.error('Error getting token:', error);
    }
}
