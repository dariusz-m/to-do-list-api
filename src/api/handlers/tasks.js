const {
    addNewTask, updateTask, getTasksByUserId, deleteTask,
} = require('../../tasks');


const ERROR_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Add task handler.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const addNewTaskHandler = async (req, res) => {
    const { task } = req.body;
    try {
        const taskId = await addNewTask(req.user.id, task);
        res.json({ taskId });
    } catch (e) {
        res.status(400).json({ errorMessage: ERROR_MESSAGE });
    }
};

/**
 * Update task handler.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateTaskHandler = async (req, res) => {
    const { taskId, newTaskDesc } = req.body;
    try {
        await updateTask(taskId, req.user.id, newTaskDesc);
        res.sendStatus(200);
    } catch (e) {
        res.status(400).json({ errorMessage: ERROR_MESSAGE });
    }
};

/**
 * Get all of the user tasks.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserTasksHandler = async (req, res) => {
    try {
        const tasks = await getTasksByUserId(req.user.id);
        res.json({ tasks });
    } catch (e) {
        res.status(400).json({ errorMessage: ERROR_MESSAGE });
    }
};

/**
 * Delete task handler.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteTaskHandler = async (req, res) => {
    const { taskId } = req.body;
    try {
        await deleteTask(taskId, req.user.id);
        res.sendStatus(200);
    } catch (e) {
        res.status(400).json({ errorMessage: ERROR_MESSAGE });
    }
};

module.exports = {
    addNewTaskHandler,
    updateTaskHandler,
    getUserTasksHandler,
    deleteTaskHandler,
};
