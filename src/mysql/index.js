const util = require('util');
const mysql = require('mysql');

const config = require('../config');

let connectionPool;

module.exports = () => {
    if (!connectionPool) {
        connectionPool = mysql.createPool({
            host: config.mysql.host,
            port: config.mysql.port,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database,
        });
        connectionPool.query = util.promisify(connectionPool.query);
    }
    return connectionPool;
};
