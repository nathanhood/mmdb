const path = require('path');
const ENV = require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }).parsed;


module.exports = {
    development: {
        username: ENV.DEV_DB_USER,
        password: ENV.DEV_DB_PASSWORD,
        database: ENV.DEV_DB_DATABASE,
        host: ENV.DEV_DB_HOST,
        dialect: 'mysql'
    },
    test: {
        username: 'root',
        password: null,
        database: 'mmdb',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: ENV.PROD_DB_USER,
        password: ENV.PROD_DB_PASSWORD,
        database: ENV.PROD_DB_DATABASE,
        host: ENV.PROD_DB_HOST,
        dialect: 'mysql'
    }
};
