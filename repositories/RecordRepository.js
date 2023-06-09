import IRepository from './IRepository.js';

import Record from '../models/Record.js';

class RecordRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newData) {
    await newData.save();

    return this.getById(newData._id);
  }

  async update(id, newData) {
    const item = await Record.findOneAndUpdate({ _id: id }, newData, {
      new: true,
    });

    return item;
  }

  async getById(id) {
    const item = await Record.findById(id);

    if (!item) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    return item;
  }

  async getAll() {
    const items = await Record.find();

    return items;
  }

  async delete(id) {
    const item = await this.getById(id);

    if (!item) return false;

    await Record.deleteOne({ _id: id });

    return true;
  }
}

export default RecordRepository;
