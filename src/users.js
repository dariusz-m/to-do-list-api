const users = [
    {
        id: 1,
        username: 'jonsnow',
        email: 'jonsnow@email.com',
        hashedPassword: '$2b$10$mGMstqiZPBPrSzX7/EdFaO0g2MuRLVYHW3CvhlIkHOOc8QfE6mFpa', // "password"
    },
];

/**
 * Find user by username
 * @param {string} username - User name
 * @returns {{id: number, username: string, email: string, hashedPassword: string}}
 */
const findUserByUsername = username => users.find(user => user.username === username);

exports.findUserByUsername = findUserByUsername;
