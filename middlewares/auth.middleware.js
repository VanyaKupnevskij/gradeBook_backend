import jwt from 'jsonwebtoken';
import config from 'config';

import { LAYER } from '../config/enums.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';

const auth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1]; // 'Bearer TOKEN'
  if (!token) {
    throw new AppError({ ...ERROR_PRESETS.AUTHORIZATION, layer: LAYER.global });
  }

  const decoded = jwt.verify(token, config.get('jwtSecret'));
  req.user = decoded;

  next();
};

export default auth;
