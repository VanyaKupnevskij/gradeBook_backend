import { Router } from 'express';

import RegistrationAction from '../actions/auth/RegistrationAction.js';
import LoginAction from '../actions/auth/LoginAction.js';
import GetUsersAction from '../actions/auth/GetUsersAction.js';
import GetUserByIdAction from '../actions/auth/GetUserByIdAction.js';
import UpdateUserAction from '../actions/auth/UpdateUserAction.js';
import DeleteUserByIdAction from '../actions/auth/DeleteUserByIdAction.js';

import auth from '../middlewares/auth.middleware.js';

const authRouter = new Router();

const registrationAction = new RegistrationAction();
const loginAction = new LoginAction();
const getUsersAction = new GetUsersAction();
const getUserByIdAction = new GetUserByIdAction();
const updateUserAction = new UpdateUserAction();
const deleteUserByIdAction = new DeleteUserByIdAction();

authRouter.post('/registration', auth, registrationAction.run);
authRouter.post('/login', loginAction.run);
authRouter.get('/', auth, getUsersAction.run);
authRouter.get('/:id', auth, getUserByIdAction.run);
authRouter.put('/:id', auth, updateUserAction.run);
authRouter.delete('/:id', auth, deleteUserByIdAction.run);

export default authRouter;
