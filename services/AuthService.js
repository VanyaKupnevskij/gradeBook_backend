import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';

import { STRENGTH_BCRYCT } from '../config/enums.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import User from '../models/User.js';

class AuthService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  registration = async (name, email, password, role, name_subject) => {
    const findedUser = await this.repository.findByEmail(email);
    if (findedUser) {
      throw new AppError(ERROR_PRESETS.REGISTRATION(email));
    }

    const hashedPassword = await bcrypt.hash(password, STRENGTH_BCRYCT);
    let user = new User({ name, email, role, name_subject, password: hashedPassword });

    const createdUser = await this.repository.insert(user);

    return createdUser;
  };

  login = async (email, password) => {
    const findedUser = await this.repository.findByEmail(email);
    if (!findedUser) {
      throw new AppError(ERROR_PRESETS.AUTHORIZATION);
    }

    const isMatch = await bcrypt.compare(password, findedUser.password);
    if (!isMatch) {
      throw new AppError(ERROR_PRESETS.AUTHORIZATION);
    }

    const token = jwt.sign({ id: findedUser.id, role: findedUser.role }, config.get('jwtSecret'));

    return {
      token,
      name: findedUser.name,
      email: findedUser.email,
      role: findedUser.role,
      name_subject: findedUser.name_subject,
    };
  };

  update = async (itemData) => {
    let item = {
      name: itemData.name,
      role: itemData.role,
      name_subject: itemData.name_subject,
      students: itemData.students,
    };

    const updatedItem = await this.repository.update(itemData.id, item);

    return updatedItem;
  };

  getUsers = async () => {
    const items = await this.repository.getAll();

    return items;
  };

  deleteUserById = async (id) => {
    const isSeccessful = await this.repository.delete(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_ENTITY_BY_ID(id));
    }
  };

  getUserById = async (id) => {
    const item = await this.repository.getById(id);

    return item;
  };
}

export default AuthService;
