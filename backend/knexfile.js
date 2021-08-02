module.exports = {
  client: 'pg',
  connection: {
    host: process.env.TODO_APP_DB_HOST,
    user: process.env.TODO_APP_DB_USER,
    password: process.env.TODO_APP_DB_PASSWORD,
    database: process.env.TODO_APP_DB_DATABASE,
    port: process.env.TODO_APP_DB_PORT,
  },
  searchPath: ['knex', 'public'],
};
