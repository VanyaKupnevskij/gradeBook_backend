import { LAYER, STATUS, USER_CODE } from '../config/enums.js';

class AppError extends Error {
  constructor(options) {
    if (!options || !options.message) throw new Error('message param required');

    super(options.message);
    this.status = options.status || STATUS.fall_server;
    this.userCode = options.userCode || USER_CODE.error_server;
    this.layer = options.layer || LAYER.global;
  }
}

export const ERROR_PRESETS = {
  AUTHORIZATION: {
    message: 'Error authorization!',
    status: STATUS.non_authorization,
    userCode: USER_CODE.ok,
    layer: LAYER.service,
  },
  REGISTRATION: (email) => {
    return {
      message: `User with email <${email}> exist in BD`,
      status: STATUS.bad_request,
      userCode: USER_CODE.ok,
      layer: LAYER.service,
    };
  },
  CREATE: (property) => {
    return {
      message: `Entity with key property <${property}> exist in BD`,
      status: STATUS.bad_request,
      userCode: USER_CODE.ok,
      layer: LAYER.service,
    };
  },
  INVALID_INPUT: (name, data, message) => {
    return {
      message: `${name}${data ? ` <${data}>` : ''}: ${message}`,
      status: STATUS.bad_request,
      userCode: USER_CODE.ok,
      layer: LAYER.action,
    };
  },
  ENTITY_ID_NOT_EXIST: (id) => {
    return {
      message: `The entity with id <${id}> does not exist.`,
      status: STATUS.bad_request,
      userCode: USER_CODE.ok,
      layer: LAYER.repository,
    };
  },
  DELETE_ENTITY_BY_ID: (id) => {
    return {
      message: `Failed deleted entity by id <${id}>`,
      status: STATUS.ok,
      userCode: USER_CODE.error_server,
      layer: LAYER.service,
    };
  },
  BUY_ENTITY_BY_ID: (id) => {
    return {
      message: `Failed buy entity by id <${id}>`,
      status: STATUS.ok,
      userCode: USER_CODE.error_server,
      layer: LAYER.service,
    };
  },
};

export default AppError;
