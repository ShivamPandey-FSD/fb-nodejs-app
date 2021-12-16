const expressJwt = require('express-jwt');
const config = require('config');
const userService = require('../users/user.service');

function jwt() {
    const secret = config.get('authenticationSecret');
    const tokenTimeout = config.get('tokenExpireInTime');
    return expressJwt({
        secret, algorithms: ['HS256'], isRevoked, expiresIn: tokenTimeout
    }).unless({
        path: [
            '/users/authenticate',
            '/users/register',
            '/users/finduserbyemail',
            {
                url: /^\/users\/.*/,
                methods: ['PUT']
            }
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.findUserById(payload.sub);
    
    if(!user) {
        return done(null, true);
    }
    done();
}

module.exports = jwt;