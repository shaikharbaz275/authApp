// mysqlClient.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectModule: require('mysql2'), // Explicitly specify mysql2 module
  port: 3306,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch(err => {
    console.error('Unable to connect to MySQL:', err);
  });

const MAX_RETRIES = 10;
const RETRY_DELAY = 5000; // 5 seconds

async function connectWithRetry(retries = MAX_RETRIES) {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      return;
    } catch (error) {
      console.error(`Unable to connect to the database. Retrying in ${RETRY_DELAY / 1000} seconds...`);
      retries -= 1;
      if (!retries) throw error;
      await new Promise(res => setTimeout(res, RETRY_DELAY));
    }
  }
}

module.exports = { sequelize, connectWithRetry };
