const jwt = require('jsonwebtoken');

const config = require('../config');


/**
 * Get access token from headers
 * @param {Object} headers - Request headers
 * @returns {string|null}
 */
const getAccessTokenFromHeaders = (headers) => {
    const bearerHeader = headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const [, token] = bearerHeader.split(' ');
        return token;
    }
    return null;
};

/**
 * Verify user.
 * @param {string} token - Access token
 * @returns {Object|boolean}
 */
const verifyUser = (token) => {
    try {
        return jwt.verify(token, config.accessTokenSecretKey);
    } catch (error) {
        return false;
    }
};

/**
 * Create user access token.
 * @param {Object} user - User
 * @param {string} user.username - Username
 * @param {number} user.id - Username
 * @returns {string|null}
 */
const createUserAccessToken = (user) => {
    try {
        return jwt.sign({ username: user.username, id: user.id }, config.accessTokenSecretKey);
    } catch (error) {
        return null;
    }
};


module.exports = {
    getAccessTokenFromHeaders,
    verifyUser,
    createUserAccessToken,
};
