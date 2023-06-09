import IAction from '../IAction.js';

import UID from '../../lib/UID.js';
import RecordService from '../../services/RecordService.js';
import RecordRepository from '../../repositories/RecordRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class GetRecordAction extends IAction {
  constructor() {
    super();

    this.service = new RecordService(new RecordRepository());
  }

  run = async (req, res) => {
    const { id } = this.validate(req.params);

    const item = await this.service.getById(id);

    return res.json({ ...item });
  };

  validate(input) {
    const { id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return { id };
  }
}

export default GetRecordAction;
