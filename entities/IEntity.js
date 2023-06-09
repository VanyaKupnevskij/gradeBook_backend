import UID from '../lib/UID.js';

class IEntity {
  constructor(uid = UID.create()) {
    if (uid === undefined) {
      throw new Error('UID not valid');
    }

    this.id = uid;
  }
}

export default IEntity;
