import IAction from '../IAction.js';

import RecordService from '../../services/RecordService.js';
import RecordRepository from '../../repositories/RecordRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';
import UID from '../../lib/UID.js';

class GetAllRecordsAction extends IAction {
  constructor() {
    super();

    this.service = new RecordService(new RecordRepository());
  }

  run = async (req, res) => {
    const validData = this.validate({ ...req.query, owner_id: req.user.id });

    const items = await this.service.getAll(validData);

    return res.json(items);
  };

  validate(input) {
    if (!UID.isValid(input.owner_id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', input.owner_id, 'is invalid'));
    }

    if (!input.start_date) {
      input.start_date = new Date('1901-01-01');
    }
    if (!Date.parse(input.start_date)) {
      throw new AppError(
        ERROR_PRESETS.INVALID_INPUT('Start_date', input.start_date, 'is not valid'),
      );
    }

    if (!input.end_date) {
      input.end_date = new Date('4000-01-01');
    }
    if (!Date.parse(input.end_date)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('End_date', input.end_date, 'is not valid'));
    }

    if (!input.projects_id) {
      throw new AppError(
        ERROR_PRESETS.INVALID_INPUT('Projects_id', input.projects_id, 'must exist'),
      );
    }

    return input;
  }
}

export default GetAllRecordsAction;
