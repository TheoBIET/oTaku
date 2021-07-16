const { Pool } = require('pg');

const client = new Pool(process.env.DATABASE_URL);

module.exports = client;