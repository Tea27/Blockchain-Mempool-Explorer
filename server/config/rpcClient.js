require('dotenv-safe').config();

const BitcoinCore = require('bitcoin-core');

const client = new BitcoinCore({
  host: process.env.RPC_HOST,
  port: process.env.RPC_PORT,
  username: process.env.RPC_USER,
  password: process.env.RPC_PASS,
  timeout: 60000,
});

module.exports = client;
