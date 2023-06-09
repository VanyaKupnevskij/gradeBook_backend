import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';

class UserRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newUser) {
    await connection.query('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', [
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.password,
    ]);

    return this.getById(newUser.id);
  }

  async update(id, newUser) {}

  async getById(id) {
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);

    const user = rows[0];
    if (!user) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    return user;
  }

  async getAll() {
    const [rows] = await connection.execute('SELECT id, email, name FROM users');

    return rows;
  }

  async delete(id) {
    const result = await connection.query('DELETE FROM users WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }

  async findByEmail(email) {
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    return rows;
  }
}

export default UserRepository;
