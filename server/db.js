require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PGPORT,
  database: process.env.PGDB,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    const query = 'SELECT * FROM product WHERE id = 1'
    const res = await client.query(query, params);
    return res.rows
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

module.exports = client;