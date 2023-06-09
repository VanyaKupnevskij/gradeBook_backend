import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import Record from '../models/Record.js';

class RecordService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (itemData) => {
    let item = new Record();
    item.projects_id = itemData.projects_id;
    item.owner_id = itemData.owner_id;
    item.date = itemData.date ?? new Date(Date.now());
    item.money_account = itemData.money_account;
    item.comment = itemData.comment ?? '';
    item.source_from = itemData.source_from;

    const createdItem = await this.repository.insert(item);

    return createdItem;
  };

  update = async (itemData) => {
    let item = new Record(itemData.id);
    item.projects_id = itemData.projects_id;
    item.owner_id = itemData.owner_id;
    item.date = itemData.date ?? new Date(Date.now());
    item.money_account = itemData.money_account;
    item.comment = itemData.comment ?? '';
    item.source_from = itemData.source_from;

    const updatedItem = await this.repository.update(item);

    return updatedItem;
  };

  getAll = async ({ start_date, end_date, owner_id, projects_id }) => {
    const items = await this.repository.getAll(start_date, end_date, owner_id, projects_id);

    return items;
  };

  getById = async (id) => {
    const item = await this.repository.getById(id);

    return item;
  };

  deleteById = async (id) => {
    const isSeccessful = await this.repository.delete(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_ENTITY_BY_ID(id));
    }
  };
}

export default RecordService;
