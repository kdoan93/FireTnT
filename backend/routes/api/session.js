const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

//  Log in route
router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
        //  Query for user ID by provided creds: username/email
        where: { [Op.or]: {
            firstName: credential,
            lastName: credential,
            email: credential,
            username: credential,
        } }
    });

    //  If no credentials/password != hashedPassword found in db, throw error
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
    }

    //  If successful login, setTokenCookie() & res.JSON w/ user non-sensitive info
    //  DO NOT INCLUDE 'hashedPassword'
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser })
});

//  Logout route
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Successfully logged out.' });
});


//  Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        };
        return res.json({ user: safeUser });
    } else return res.json({ user: null })
});

//  Validating login req.body
const validateLogin = [
    //  Checking req.body.credential & req.body.password is not empty, if empty, throws an error
    check('credential').exists({ checkFalsy: true }).notEmpty().withMessage('Please provide a valid email or username.'),
    check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.'),
    handleValidationErrors];

//  Route to validate login
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
        where: { [Op.or]: {
            firstName: credential,
            lastName: credential,
            email: credential,
            username: credential,
        }}
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
    }

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
})



module.exports = router;
