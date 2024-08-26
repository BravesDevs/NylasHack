// Configure express router
import { Router } from 'express';
export const router = Router();
import { getAuthURLController, generateTokenForCode } from '../controllers/main';

router.get('/nylas/auth', getAuthURLController);
router.get('/oauth/exchange', generateTokenForCode);

