import pool from '../db-pool';
import camelcaseKeys from 'camelcase-keys';

export interface TodoItemsTableRecord {
  userId: number;
  item: string;
  createdAt: Date;
  id: number;
}

class TodoItemsTable {
  async findOne(id: number): Promise<TodoItemsTableRecord | null> {
    const result = await pool.query<TodoItemsTableRecord>(
      'SELECT * FROM todo_items WHERE id = $1',
      [id]
    );

    return camelcaseKeys(result.rows[0]) ?? null;
  }

  async findByUserId(userId: number): Promise<Array<TodoItemsTableRecord>> {
    const result = await pool.query<TodoItemsTableRecord>(
      'SELECT * FROM todo_items WHERE user_id = $1 ORDER BY created_at',
      [userId]
    );

    return result.rows.map((row) => camelcaseKeys(row));
  }

  async insert(
    record: Pick<TodoItemsTableRecord, Exclude<keyof TodoItemsTableRecord, 'id' | 'createdAt'>>
  ): Promise<number> {
    const result = await pool.query(
      'INSERT INTO todo_items (user_id, item) values ($1, $2) RETURNING id',
      [record.userId, record.item]
    );

    return result.rows[0].id;
  }

  async delete(id: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM todo_items WHERE id = $1 AND user_id = $2 RETURNING id;',
      [id, userId]
    );

    return result.rowCount > 0;
  }
}

export default new TodoItemsTable();
