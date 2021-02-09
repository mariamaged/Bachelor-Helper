const http = require('httpntlm');
const authorization = {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD
}
const authorize = () => {
    console.log(authorization);
    return new Promise((resolve, reject) => {
        http.get(
            {
                ...authorization,
                url: process.env.HOMEPAGE_URL,
                rejectUnauthorized: false
            },
            (err, res) => {
                console.log(
                    res.statusCode === 200
                        ? 'You are authorized\n'
                        : 'You are not authorized\n'
                );
                resolve(res.statusCode === 200);
            }
        );
    });
};

module.exports = {
    authorize,
    authorization
}