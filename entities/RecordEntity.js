import IEntity from './IEntity.js';

class RecordEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.owner_id = null;
    this.projects_id = null;

    this.date = new Date(Date.now());
    this.money_account = null;
    this.comment = '';
    this.source_from = null;

    this.income = null;
    this.costs = null;
  }
}

export default RecordEntity;
