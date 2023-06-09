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

  run = async (req, res) => {
    let validData = this.validate({ ...req.body, owner_id: req.user.id, id: req.params.id });

    const updatedItem = await this.service.update(validData);

    return res.status(STATUS.updated).json({ ...updatedItem });
  };

  validate(input) {
    if (!UID.isValid(input.id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', input.id, 'is invalid'));
    }

    return input;
  }
}

export default UpdateRecordAction;
