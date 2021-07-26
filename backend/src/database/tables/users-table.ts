import pool from '../db-pool';
import camelcaseKeys from 'camelcase-keys';

export interface UsersTableRecord {
  firstName: string | null;
  lastName: string | null;
  email: string;
  id: number;
  profilePhotoUrl: string | null;
  password: string;
}

class UsersTable {
  async insert(record: UsersTableRecord): Promise<number> {
    const result = await pool.query<UsersTableRecord>(
      'INSERT INTO USERS ' +
        '(first_name, last_name, email, profile_photo_url, password) ' +
        "VALUES ($1, $2, $3, $4, crypt($5, gen_salt('bf', 8))) " +
        'RETURNING id',
      [record.firstName, record.lastName, record.email, record.profilePhotoUrl, record.password]
    );

    return result.rows[0].id;
  }

  async setPassword(id: number, password: string): Promise<boolean> {
    const result = await pool.query<UsersTableRecord>(
      "UPDATE USERS SET password = crypt($2, gen_salt('bf', 8)) WHERE id = $1",
      [id, password]
    );

    return result.rowCount > 0;
  }

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
