const getConnection = require('./mysql');

/**
 * Add new task and return id
 * @param {number} userId - User id
 * @param {string} task - Task to do
 * @returns {number}
 */
const addNewTask = async (userId, task) => {
    const result = await getConnection().query(
        'INSERT INTO tasks (user_id, task) VALUES (?, ?)',
        [userId, task],
    );
    return result.insertId;
};

/**
 * Update task
 * @param {number} taskId - Task id
 * @param {number} userId - User id
 * @param {string} taskDesc - New task description
 */
const updateTask = async (taskId, userId, taskDesc) => {
    await getConnection().query(
        'UPDATE tasks SET task = ? WHERE id = ? and user_id = ?',
        [taskDesc, taskId, userId],
    );
};

/**
 * Get task by user id and task id.
 * @param {number} taskId - Task id
 * @param {number} userId - User id
 * @returns {{id: number, userId: number, task: string}}
 */
const getTask = async (taskId, userId) => {
    const [result] = await getConnection().query(
        'SELECT * FROM tasks WHERE id = ? and user_id = ?',
        [taskId, userId],
    );
    return { id: result.id, userId: result.user_id, task: result.task };
};

/**
 * Get tasks by user id.
 * @param {number} userId - User id
 * @returns {Array<{id: number, userId: number, task: string}>}
 */
const getTasksByUserId = async (userId) => {
    const results = await getConnection().query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return results.map(task => ({ id: task.id, task: task.task }));
};

/**
 * Delete task
 * @param {number} taskId - Task id
 * @param {number} userId - User id
 */
const deleteTask = async (taskId, userId) => {
    await getConnection().query(
        'DELETE FROM tasks WHERE id = ? and user_id = ?',
        [taskId, userId],
    );
};

module.exports = {
    addNewTask,
    getTask,
    getTasksByUserId,
    updateTask,
    deleteTask,
};
