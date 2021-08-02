/**
 * @param {import('knex').Knex<any, unknown>} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.bigIncrements();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('password');
    table.string('email').notNullable();
    table.string('profile_photo_url');
  });

  await knex.schema.createTable('todo_items', (table) => {
    table.bigIncrements();
    table.bigInteger('user_id').notNullable();
    table.string('item').notNullable();
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.string('completed_at').defaultTo(knex.fn.now());
  });

  await knex('users').insert({
    firstName: 'Ada',
    lastName: 'lovelace',
    password: knex.raw(`crypt('abc123', gen_salt('bf', 8))`),
    email: 'ada@example.com',
    profilePhotoUrl:
      'https://www.stylist.co.uk/images/app/uploads/2018/10/09155947/ada-lovelace-day-2018-quotes-facts-biography-crop-1539097197-1366x1366.jpg?w=256&amp;h=256&amp;fit=max&amp;auto=format%2Ccompress',
  });
};

exports.down = (knex) => {};
