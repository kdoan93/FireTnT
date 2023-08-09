const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//  validateSignup middleware checks/validates req.body.email, req.body.username, req.body.password
const validateSignup = [
    check('firstName').exists({ checkFalsy: true }).withMessage('First Name is required.'),
    check('lastName').exists({ checkFalsy: true }).withMessage('Last Name is required.'),
    check('email').exists({ checkFalsy: true }).isEmail().withMessage("Invalid email."),
    check('username').exists({ checkFalsy: true }).isLength({ min: 4 }).withMessage('Username is required.').not().isEmail().withMessage('Username cannot be an email.'),
    check('password').exists({ checkFalsy: true }).isLength({ min: 6 }).withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

//  Sign up route
//  Route to use validateSignup middleware
router.post('', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    //  Check if email exists
    const checkEmail = await User.findOne({
        where: { email: email }
    });
    if (checkEmail) {
        return res.status(500).json({
            message: "User already exists",
            errors: { email: "User with that email already exists" }
        })
    };

    //  Check if username exists
    const checkUsername = await User.findOne({
        where: { username: username }
    });
    if (checkUsername) {
        return res.status(500).json({
            message: "User already exists",
            errors: { email: "User with that username already exists" }
        })
    };

    //  Hash created password
    const hashedPassword = bcrypt.hashSync(password);

    //  Create the user with req.body data
    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.status(200).json({ user: safeUser })
})




module.exports = router;
