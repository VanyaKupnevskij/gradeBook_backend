import IAction from '../IAction.js';

import AuthService from '../../services/AuthService.js';
import UserRepository from '../../repositories/UserRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class LoginAction extends IAction {
  constructor() {
    super();

    this.authService = new AuthService(new UserRepository());
  }

  run = async (req, res) => {
    const { name, email, password } = this.validate(req.body);

    const userData = await this.authService.login(email, password);

    return res.json({ ...userData });
  };

  validate(input) {
    const { name, email, password } = input;

    const regexEmail = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i;

    const regexPassword = {
      number: { reg: /^(?=.*\d)/gm, message: 'must contain 1 number (0-9)' },
      bigLetter: { reg: /^(?=.*[A-Z])/gm, message: 'must contain 1 uppercase letters' },
      smallLetter: { reg: /^(?=.*[a-z])/gm, message: 'must contain 1 lowercase letters' },
      nonAlpha: {
        reg: /^(?=.*[^\w\d\s:])/gm,
        message: 'must contain 1 non-alpha numeric number',
      },
      length: { reg: /^([^\s]){8,16}$/gm, message: 'must have 8-16 characters with no space' },
    };

    if (!email) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Email', email, 'must exist'));
    }
    if (!password) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Password', password, 'must exist'));
    }

    if (!regexEmail.test(email)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Email', email, "isn't correct. Check it"));
    }

    for (let regex of Object.values(regexPassword)) {
      if (!regex.reg.test(password)) {
        throw new AppError(ERROR_PRESETS.INVALID_INPUT('Password', null, regex.message));
      }
    }

    return { name, email, password };
  }
}

export default LoginAction;
