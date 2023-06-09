import IAction from '../IAction.js';

import RecordService from '../../services/RecordService.js';
import RecordRepository from '../../repositories/RecordRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';
import { STATUS } from '../../config/enums.js';
import UID from '../../lib/UID.js';

class UpdateRecordAction extends IAction {
  constructor() {
    super();

    this.service = new RecordService(new RecordRepository());
  }

  get accessTag() {
    return 'record:update';
  }

  run = async (req, res) => {
    this.checkRole(req.user.role);

    let validData = this.validate({ ...req.body, id: req.params.id });

    const updatedItem = await this.service.update(validData);

    return res.status(STATUS.updated).json({
      from: updatedItem.from,
      to: updatedItem.to,
      date: updatedItem.date,
      status: updatedItem.status,
      comment: updatedItem.comment,
      mark: updatedItem.mark,
    });
  };

  validate(input) {
    if (!UID.isValid(input.id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', input.id, 'is invalid'));
    }

    return input;
  }
}

export default UpdateRecordAction;
