const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
  user: config.db.user,
  password: config.db.password,
});

const init = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT
    )
  `);
};

const getUsers = async () => {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
};

const addUser = async (name) => {
  const res = await pool.query(
    'INSERT INTO users(name) VALUES($1) RETURNING *',
    [name]
  );
  return res.rows[0];
};

module.exports = {
  init,
  getUsers,
  addUser
};