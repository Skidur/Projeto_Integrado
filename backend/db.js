const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'appnutricao',
  password: 'sua_senha_aqui',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};