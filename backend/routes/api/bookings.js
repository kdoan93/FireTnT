const express = require('express');
const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking } = require('../../db/models');
const router = express.Router();


/***        Get all of the Current User's Bookings      ***/
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {userId: req.user.id},
        include: [
            { model: Spot, attributes: [ 'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price' ] }]
    })

    return res.status(200).json({Bookings: bookings})
})




module.exports = router;
