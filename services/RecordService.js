import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import Record from '../models/Record.js';

class RecordService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (itemData) => {
    let item = new Record({
      from: itemData.from,
      to: itemData.to,
      date: itemData.date,
      status: itemData.status,
      comment: itemData.comment,
      mark: itemData.mark,
    });

    const createdItem = await this.repository.insert(item);

    return createdItem;
  };

  update = async (itemData) => {
    let item = {
      from: itemData.from,
      to: itemData.to,
      date: itemData.date,
      status: itemData.status,
      comment: itemData.comment,
      mark: itemData.mark,
    };

    const updatedItem = await this.repository.update(itemData.id, item);

    return updatedItem;
  };

  getAll = async () => {
    const items = await this.repository.getAll();

    return items;
  };

  deleteById = async (id) => {
    const isSeccessful = await this.repository.delete(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_ENTITY_BY_ID(id));
    }
  };

  getById = async (id) => {
    const item = await this.repository.getById(id);

    return item;
  };
}

export default RecordService;
