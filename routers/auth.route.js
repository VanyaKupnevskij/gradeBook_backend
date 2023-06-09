import { Router } from 'express';

import RegistrationAction from '../actions/auth/RegistrationAction.js';
import LoginAction from '../actions/auth/LoginAction.js';

const authRouter = new Router();

const registrationAction = new RegistrationAction();
const loginAction = new LoginAction();

authRouter.post('/registration', registrationAction.run);
authRouter.post('/login', loginAction.run);

export default authRouter;
