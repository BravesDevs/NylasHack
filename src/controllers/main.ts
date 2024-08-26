import { getAuthURLService, generateTokenForCodeService } from '../services/main';

export const getAuthURLController = async (req: any, res: any) => {
    try {
        const authUrl = await getAuthURLService();
        res.status(200).send(authUrl);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const generateTokenForCode = async (req: any, res: any) => {
    try {
        const code = req.query.code;
        const token = await generateTokenForCodeService(code);
        res.status(200).send({ ok: true, message: 'Token generated successfully, save for further use', token: token.accessToken });
    } catch (error) {
        res.status(500).send(error);
    }
}


