import dbConnection from '../db-connection';

export interface UsersTableRecord {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  profilePhotoUrl: string | null;
  password: string;
}

const TABLE_NAME = 'users';
const table = () => dbConnection<UsersTableRecord>(TABLE_NAME);
const cryptPassword = (password) => dbConnection.raw(`crypt(?, gen_salt('bf', 8))`, [password]);

class UsersTable {
  async insert(
    record: Pick<UsersTableRecord, Exclude<keyof UsersTableRecord, 'id'>>
  ): Promise<number> {
    const [userId] = await table()
      .insert({
        firstName: record.firstName,
        lastName: record.lastName,
        email: record.email,
        profilePhotoUrl: record.profilePhotoUrl,
        password: cryptPassword(record.password),
      })
      .returning<number[]>('id');

    return userId;
  }

  async setPassword(id: number, password: string): Promise<boolean> {
    const result = await table()
      .update({
        password: cryptPassword(password),
      })
      .where('id', id);

    return result > 0;
  }

  async findOneByEmail(email: string): Promise<UsersTableRecord | null> {
    const user = await table().where('email', email).first();

    return user ?? null;
  }

  async findOneByEmailAndPassword(
    email: string,
    password: string
  ): Promise<UsersTableRecord | null> {
    const user = await table()
      .where('email', email)
      .where('password', dbConnection.raw(`crypt(?, "password")`, [password]))
      .first();

    return user ?? null;
  }
}

export default new UsersTable();
