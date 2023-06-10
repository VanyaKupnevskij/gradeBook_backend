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
    return 'auth:get-by-id';
  }

  run = async (req, res) => {
    this.checkRole(req.user.role);

    const { id } = this.validate({ id: req.params.id === 'self' ? req.user.id : req.params.id });

    const findedUser = await this.authService.getById(id);

    return res.json({
      id: findedUser.id,
      email: findedUser.email,
      name: findedUser.name,
      role: findedUser.role,
      name_subject: findedUser.name_subject,
      students: findedUser.students,
    });
  };

  validate(input) {
    const { id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return input;
  }
}

export default GetUserByIdAction;
