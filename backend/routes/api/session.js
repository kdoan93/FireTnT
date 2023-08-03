const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const {setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//  Log in route
router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
        //  Query for user ID by provided creds: username/email
        where: { [Op.or]: { username: credential, email: credential } }
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
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser })
});




module.exports = router;
