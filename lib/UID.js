import shortid from 'shortid';

class UID {
  static create() {
    return shortid.generate();
  }

  static isValid(uid) {
    return shortid.isValid(uid);
  }
}

export default UID;
