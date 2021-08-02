import dbConnection from '../db-connection';

export interface TodoItemsTableRecord {
  userId: number;
  item: string;
  createdAt: Date;
  completedAt: Date;
  id: number;
}

const TABLE_NAME = 'todo_items';
const table = <T = TodoItemsTableRecord[]>() => dbConnection<TodoItemsTableRecord, T>(TABLE_NAME);

class TodoItemsTable {
  async findOne(id: number): Promise<TodoItemsTableRecord | null> {
    const result = await table().select('*').where('id', id).first();

    return result ?? null;
  }

  async findIncompleteByUserId(userId: number): Promise<Array<TodoItemsTableRecord>> {
    const results = await table()
      .select('*')
      .where('user_id', userId)
      .whereNull('completed_at')
      .orderBy('created_at');

    return results;
  }

  async insert(
    record: Pick<
      TodoItemsTableRecord,
      Exclude<keyof TodoItemsTableRecord, 'id' | 'createdAt' | 'completedAt'>
    >
  ): Promise<number> {
    const [id] = await table<number>().insert(record).returning('id');

    return id;
  }

  async complete(id: number, userId: number): Promise<TodoItemsTableRecord | null> {
    const [record] = await table()
      .update({ completedAt: dbConnection.raw('now()') })
      .where('id', id)
      .where('user_id', userId)
      .returning('*');

    return record ?? null;
  }
}

export default new TodoItemsTable();
