const { getAccessTokenFromHeaders } = require('../../authentication/access-token');


it('Get user access token from request headers', async () => {
    const token = 'SDSdsdsdsds33e2';
    const request = {
        headers: { authorization: `Bearer ${token}` },
    };

    expect(getAccessTokenFromHeaders(request.headers)).toEqual(token);
});
