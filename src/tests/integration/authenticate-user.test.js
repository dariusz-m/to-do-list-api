const { authenticateUser } = require('../../authentication/authenticate-user');


it('If user authentication is successful, token is returned', async () => {
    const username = 'jonsnow';
    const password = 'password';

    expect(await authenticateUser(username, password)).not.toBeNull();
});

it('If user authentication is unsuccessful, token is not returned', async () => {
    const username = 'jonsnow';
    const password = 'bad password';

    expect(await authenticateUser(username, password)).toBeNull();
});
