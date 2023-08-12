const express = require('express');
const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage } = require('../../db/models');
const router = express.Router();


/***        Get all of the Current User's Bookings      ***/
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {userId: req.user.id},
        include:
        [
            { model: Spot,
                attributes:
                    [ 'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price' ],
                include:
                    [ { model: SpotImage } ]
            }
        ]
    })

    let bookingsList = [];

    bookings.forEach(booking => { bookingsList.push(booking.toJSON()) });

    bookingsList.forEach(booking => {
        booking.Spot.SpotImages.forEach(image => { if (image.preview === true) {
            booking.Spot.previewImage = image.url
        } } )
        if (!booking.Spot.previewImage) booking.Spot.previewImage = "Spot Image couldn't be found"

        delete booking.Spot.SpotImages
    })

    return res.status(200).json({Bookings: bookingsList})
})




module.exports = router;
