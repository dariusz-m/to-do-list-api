const { authenticateUser } = require('../../authentication/authenticate-user');

/**
 * Login handler.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const accessToken = await authenticateUser(username, password);
        if (accessToken) {
            res.json({ accessToken });
        } else {
            res.status(400).json({ errorMessage: 'Bad credentials.' });
        }
    } catch (e) {
        res.sendStatus(500);
    }
};

module.exports = {
    login,
};
