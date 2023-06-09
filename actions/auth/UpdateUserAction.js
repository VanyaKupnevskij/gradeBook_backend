import IAction from '../IAction.js';

import AuthService from '../../services/AuthService.js';
import UserRepository from '../../repositories/UserRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';
import { STATUS } from '../../config/enums.js';
import UID from '../../lib/UID.js';

class UpdateUserAction extends IAction {
  constructor() {
    super();

    this.service = new AuthService(new UserRepository());
  }

  run = async (req, res) => {
    this.checkRole(req.user.role);

    let validData = this.validate({ ...req.body, id: req.params.id });

    const updatedItem = await this.service.update(validData);

    return res.status(STATUS.updated).json({
      id: updatedItem.id,
      email: updatedItem.email,
      name: updatedItem.name,
      role: updatedItem.role,
      name_subject: updatedItem.name_subject,
      students: updatedItem.students,
    });
  };

  validate(input) {
    if (!UID.isValid(input.id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', input.id, 'is invalid'));
    }

    return input;
  }
}

export default UpdateUserAction;
