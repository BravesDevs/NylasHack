import { nylas } from '../constants/config';
import { config } from '../constants/config';
import { storeToken } from '../utils/cacheHelpers';

export const getAuthURLService = async () => {


    const authUrl = nylas.auth.urlForOAuth2({
        clientId: config.clientId,
        provider: 'google',
        redirectUri: config.redirectUri || "",
        // loginHint: 'john.doe@google.com'
    });

    return authUrl;
}

export const generateTokenForCodeService = async (code: string) => {

    const token = await nylas.auth.exchangeCodeForToken({
        clientId: config.clientId,
        redirectUri: config.redirectUri || "",
        code: code
    });

    await storeToken(token.email, token.accessToken, token.grantId);

    return token;
}

