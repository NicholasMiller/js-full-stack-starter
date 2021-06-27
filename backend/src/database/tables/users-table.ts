import pool from '../db-pool';
import camelcaseKeys from 'camelcase-keys';

export interface UsersTableRecord {
  firstName: string | null;
  lastName: string | null;
  email: string;
  id: number;
}

class UsersTable {
  async findOneByEmail(email: string): Promise<UsersTableRecord | null> {
    const result = await pool.query<UsersTableRecord>('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    return result.rows[0] ? camelcaseKeys(result.rows[0]) : null;
  }

  async findOneByEmailAndPassword(
    email: string,
    password: string
  ): Promise<UsersTableRecord | null> {
    const result = await pool.query<UsersTableRecord | null>(
      'SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)',
      [email, password]
    );

    return result.rows[0] ?? null;
  }
}

export default new UsersTable();
