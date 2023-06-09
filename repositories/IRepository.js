class IRepository {
  constructor() {
    if (this.insert === undefined) {
      throw new Error('Must override .insert() method');
    }

    if (this.update === undefined) {
      throw new Error('Must override .update() method');
    }

    if (this.getById === undefined) {
      throw new Error('Must override .getById() method');
    }

    if (this.getAll === undefined) {
      throw new Error('Must override .getAll() method');
    }

    if (this.delete === undefined) {
      throw new Error('Must override .delete() method');
    }
  }
}

export default IRepository;
