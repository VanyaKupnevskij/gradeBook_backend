import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';

import { STRENGTH_BCRYCT } from '../config/enums.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import UserEntity from '../entities/UserEntity.js';

class AuthService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  registration = async (name, email, password) => {
    const findedUser = (await this.repository.findByEmail(email))[0];
    if (findedUser) {
      throw new AppError(ERROR_PRESETS.REGISTRATION(email));
    }

    const hashedPassword = await bcrypt.hash(password, STRENGTH_BCRYCT);
    let user = new UserEntity();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    const createdUser = await this.repository.insert(user);

    return createdUser;
  };

  login = async (email, password) => {
    const findedUser = (await this.repository.findByEmail(email))[0];
    if (!findedUser) {
      throw new AppError(ERROR_PRESETS.AUTHORIZATION);
    }

    const isMatch = await bcrypt.compare(password, findedUser.password);
    if (!isMatch) {
      throw new AppError(ERROR_PRESETS.AUTHORIZATION);
    }

    const token = jwt.sign({ id: findedUser.id }, config.get('jwtSecret'));

    return { token, name: findedUser.name, email: findedUser.email };
  };
}

export default AuthService;
