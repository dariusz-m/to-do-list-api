const bcrypt = require('bcrypt');

const { findUserByUsername } = require('../users');
const { createUserAccessToken } = require('./access-token');


/**
 * Authenticate user
 * @param {string} username - User
 * @param {string} password - Password
 * @returns {string|null}
 */
const authenticateUser = async (username, password) => {
    const user = findUserByUsername(username);
    if (user) {
        try {
            const isMatch = await bcrypt.compare(password, user.hashedPassword);
            if (isMatch) {
                return createUserAccessToken(user);
            }
        } catch (e) {}
    }
    return null;
};

module.exports = {
    authenticateUser,
};
