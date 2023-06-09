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
    if (!input.projects_id) {
      throw new AppError(
        ERROR_PRESETS.INVALID_INPUT('Projects_id', input.projects_id, 'must exist'),
      );
    }
    if (!input.owner_id) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Owner_id', input.owner_id, 'must exist'));
    }
    if (!input.money_account) {
      throw new AppError(
        ERROR_PRESETS.INVALID_INPUT('Money_account', input.money_account, 'must exist'),
      );
    }
    if (!input.source_from) {
      throw new AppError(
        ERROR_PRESETS.INVALID_INPUT('Source_from', input.source_from, 'must exist'),
      );
    }
    if (!input.income) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Income', input.income, 'must exist'));
    }
    if (!input.costs) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Costs', input.costs, 'must exist'));
    }

    return input;
  }
}

export default CreateRecordAction;
