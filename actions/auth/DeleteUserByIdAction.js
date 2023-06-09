import IAction from '../IAction.js';

import UID from '../../lib/UID.js';
import AuthService from '../../services/AuthService.js';
import UserRepository from '../../repositories/UserRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class DeleteUserByIdAction extends IAction {
  constructor() {
    super();

    this.authService = new AuthService(new UserRepository());
  }

  get accessTag() {
    return 'auth:delete-user-by-id';
  }

  run = async (req, res) => {
    this.checkRole(req.user.role);

    const { id } = this.validate(req.params);

    await this.authService.deleteUserById(id);

    return res.json({ success: true, message: `Seccesful deleted user by id: ${id}` });
  };

  validate(input) {
    const { id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return { id };
  }
}

export default DeleteUserByIdAction;
