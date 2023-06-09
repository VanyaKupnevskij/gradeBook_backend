import IAction from '../IAction.js';

import UID from '../../lib/UID.js';
import AuthService from '../../services/AuthService.js';
import UserRepository from '../../repositories/UserRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class GetUserByIdAction extends IAction {
  constructor() {
    super();

    this.authService = new AuthService(new UserRepository());
  }

  get accessTag() {
    return 'auth:get-user-by-id';
  }

  run = async (req, res) => {
    this.checkRole(req.user.role);

    const { id } = this.validate(req.params);

    const user = await this.authService.getUserById(id);

    return res.json({ id: user.id, email: user.email });
  };

  validate(input) {
    const { id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return { id };
  }
}

export default GetUserByIdAction;
