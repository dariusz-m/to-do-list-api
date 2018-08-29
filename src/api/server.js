const express = require('express');
const cors = require('cors');

const { verifyUser } = require('../authentication/access-token');
const { getAccessTokenFromHeaders } = require('../authentication/access-token');
const { login } = require('./handlers/authentication');
const {
    addNewTaskHandler, updateTaskHandler, getUserTasksHandler, deleteTaskHandler,
} = require('./handlers/tasks');

const app = express();
app.use(express.json());
app.use(cors());

/**
 * Authenticated middleware.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticated = (req, res, next) => {
    const user = verifyUser(getAccessTokenFromHeaders(req.headers));
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({ errorMessage: 'Your session has expired' });
    }
};

app.post('/api/tasks', authenticated, addNewTaskHandler);
app.put('/api/tasks', authenticated, updateTaskHandler);
app.get('/api/tasks', authenticated, getUserTasksHandler);
app.delete('/api/tasks', authenticated, deleteTaskHandler);

app.post('/api/login', login);

// eslint-disable-next-line no-console
app.listen(5000, () => console.log('Server started on port 5000'));
