import IRepository from './IRepository.js';

import User from '../models/User.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';

class UserRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newUser) {
    await newUser.save();

    return this.getById(newUser._id);
  }

  async update(id, newUser) {}

  async getById(id) {
    const user = await User.findById(id);

    if (!user) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    return user;
  }

  async getAll() {
    return await User.find();
  }

  async delete(id) {}

  async findByEmail(email) {
    return await User.findOne({ email });
  }
}

export default UserRepository;
