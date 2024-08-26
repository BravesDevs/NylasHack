import Nylas from 'nylas';
import dotenv from 'dotenv';

dotenv.config();
export const config = {
    clientId: process.env.NYLAS_CLIENT_ID || "",
    apiKey: process.env.NYLAS_API_KEY,
    apiUri: process.env.NYLAS_API_URI,
    redirectUri: process.env.NYLAS_REDIRECT_URI
}

export const nylas = new Nylas({
    apiKey: config.apiKey || "",
    apiUri: process.env.NYLAS_CLIENT_SECRET
});