export const router = require('express').Router();
import { addContactController, deleteContactController } from '../controllers/contacts';
import { checkAuthToken } from '../middlewares/auth';

router.route('/add').post(checkAuthToken, addContactController);

router.route('/delete').delete(checkAuthToken, deleteContactController);