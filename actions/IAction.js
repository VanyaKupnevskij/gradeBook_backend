import { LAYER, PERMISSIONS } from '../config/enums.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';

class IAction {
  constructor() {
    this.run = async (req, res) => {
      throw new Error('Must override .run() method');
    };

    if (this.validate === undefined) {
      throw new Error('Must override .validate() method');
    }
  }

  checkRole(role) {
    if (!role || !PERMISSIONS[role].includes(this.accessTag)) {
      throw new AppError({ ...ERROR_PRESETS.AUTHORIZATION, layer: LAYER.action });
    }
  }
}

export default IAction;
