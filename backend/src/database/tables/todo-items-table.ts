import pool from '../db-pool';

export interface TodoItemsTableRecord {
  user_id: number;
  item: string;
  display_order: number;
  id: number;
}

class TodoItemsTable {
  async findOne(id: number): Promise<TodoItemsTableRecord | null> {
    const result = await pool.query<TodoItemsTableRecord>(
      'SELECT * FROM todo_items WHERE id = $1',
      [id]
    );

    return result.rows[0] ?? null;
  }

  async insert(
    record: Pick<TodoItemsTableRecord, Exclude<keyof TodoItemsTableRecord, 'id'>>
  ): Promise<number> {
    const result = await pool.query(
      'INSERT INTO todo_items (user_id, item, display_order) values ($1, $2, $3) RETURNING id',
      [record.user_id, record.item, record.display_order]
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
