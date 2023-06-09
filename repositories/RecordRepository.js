import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import loadQuery from '../queries/loadQuery.js';

const createQuery = loadQuery('records/create');
const getAllQuery = loadQuery('records/getAll');
const getQuery = loadQuery('records/get');
const updateQuery = loadQuery('records/update');

class RecordRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newData) {
    await connection.query(createQuery, [
      newData.id,
      newData.projects_id,
      newData.owner_id,
      newData.date,
      newData.money_account,
      newData.comment,
      newData.source_from,

      newData.income.id,
      newData.income.price,

      newData.costs.id,
      newData.costs.workers_id,
      newData.costs.price,
      newData.costs.already_paid,
    ]);

    return this.getById(newData.id);
  }

  async update(newData) {
    await connection.query(updateQuery, [
      newData.date,
      newData.money_account,
      newData.comment,
      newData.source_from,

      newData.income.price,

      newData.costs.workers_id,
      newData.costs.price,
      newData.costs.already_paid,

      newData.id,
      newData.id,
      newData.id,
    ]);

    return this.getById(newData.id);
  }

  async getById(id) {
    const items = await connection.query(getQuery, [id]);

    return items[0][1][0];
  }

  async getAll(start_date, end_date, owner_id, projects_id) {
    const items = await connection.query(getAllQuery, [
      start_date,
      end_date,
      owner_id,
      projects_id,
    ]);

    return items[0][3];
  }

  async delete(id) {
    const result = await connection.query('DELETE FROM records WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }
}

export default RecordRepository;
