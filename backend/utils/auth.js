//  File to store 3 authentication helper functions.
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

/***        1st Authentication Middleware function      ***/
/*      Sendsa a JWT Cookie     */
//  setTokenCookie() will be used in login and signup routes
const setTokenCookie = (res, user) => {

    //  Create the token
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn) }  // 604,800 sec = 1 wk
    );

    const isProduction = process.env.NODE_ENV === "production";

    //  Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,   //maxAge in ms
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
}


/***      2nd Authentication Middleware function     ***/
//  Function that will restore the user session based on contents of the JWT cookie
//  restoreUser middleware will connect to API router so all API route handlers will
//  check if current user logged in or out.
const restoreUser = (req, res, next) => {

    //  Token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) return next();

    try {
        const { id } = jwtPayload.data;
        req.user = await User.findByPk(id, {
            attributes: {
                include: [ 'email', 'createdAt', 'updatedAt' ]
            }
        });
    } catch (e) {
        res.clearCookie('token');
        return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
    });
}


/***        3rd Authentication Middleware function      ***/
//  Connects directly to route handlers where a current user must be logged in
//  If no current user, returns an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}




module.exports = { setTokenCookie, restoreUser, requireAuth };
