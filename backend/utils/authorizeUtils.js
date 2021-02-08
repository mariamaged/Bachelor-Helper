const http = require('httpntlm');

var authorization = {
    username: '',
    password: ''
}

const authorize = () => {
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
                        : 'You are not authroized\n'
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