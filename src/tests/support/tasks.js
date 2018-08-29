const getConnection = require('../../mysql');

/**
 * Clear tasks in storage
 */
const clearTasks = async () => {
    await getConnection().query('TRUNCATE TABLE tasks');
};

/**
 * Close all connections to database.
 */
const endConnectionPool = async () => {
    await getConnection().end();
};

module.exports = {
    endConnectionPool,
    clearTasks,
};
