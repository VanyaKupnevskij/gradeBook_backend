import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import RecordService from '../../services/RecordService.js';
import RecordRepository from '../../repositories/RecordRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class CreateRecordAction extends IAction {
  constructor() {
    super();

    this.service = new RecordService(new RecordRepository());
  }

  run = async (req, res) => {
    let validData = this.validate({ ...req.body, owner_id: req.user.id });

    const createdItem = await this.service.create(validData);

    return res.status(STATUS.created).json({ ...createdItem });
  };

  validate(input) {
    if (!input.from) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('From', input.from, 'must exist'));
    }
    if (!input.to) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('To', input.to, 'must exist'));
    }

    return input;
  }
}

export default CreateRecordAction;
