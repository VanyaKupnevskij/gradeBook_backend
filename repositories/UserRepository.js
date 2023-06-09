import IRepository from './IRepository.js';

import User from '../models/User.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';

class UserRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newData) {
    await newData.save();

    return this.getById(newData._id);
  }

  async update(id, newData) {
    const user = await User.findOneAndUpdate({ _id: id }, newData, {
      new: true,
    });

    return user;
  }

  async getById(id) {
    const user = await User.findById(id);

    if (!user) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    return user;
  }

  async getAll() {
    const users = await User.find();

    for (let user of users) {
      user.password = null;
    }

    return users;
  }

  async delete(id) {
    const user = await this.getById(id);

    if (!user) return false;

    await User.deleteOne({ _id: id });

    return true;
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }
}

export default UserRepository;
