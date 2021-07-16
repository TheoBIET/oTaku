const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);

client.connect()

module.exports = client;