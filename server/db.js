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
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

module.exports = client;