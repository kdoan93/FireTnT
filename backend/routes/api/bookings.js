const express = require('express');
const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking, SpotImage } = require('../../db/models');
const router = express.Router();


/***        Validate endDate selection      ***/
const validateEndDate = (value, { req }) => {
    if (new Date(value) <= new Date(req.body.startDate)) throw new Error("endDate cannot be on or before startDate");
    return true;
}


/***        Validate booking endDate        ***/
const validateBooking = [
    check("endDate").exists({ checkFalsy: true }).custom(validateEndDate),
    handleValidationErrors
]


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


/***        Edit a Booking      ***/
router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {
    let editBooking = await Booking.findByPk(req.params.bookingId,
        // { include: [ { model: Spot } ] }
    )
    let { startDate, endDate } = req.body

    //  Convert dates to date objects
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    //  If booking doesn't exist, throw an error
    if (!editBooking) return res.status(404).json({ message: "Booking couldn't be found" });

    //  Bookings that have started can't be deleted
    if (editBooking.startDate < new Date()) return res.status(400).json({ message: "Past bookings can't be modified" })

    //  Check if booking exists
    const booking = await Booking.findOne({
        where: { spotId: editBooking.spotId,
            [ Op.or ]:
                [
                    { startDate: { [ Op.between ]: [ startDate, endDate ] } },
                    { endDate: { [Op.between]: [ startDate, endDate ] } }
                ]
        }
    });

    if (booking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    };

    //  Check if req.user.id === booking.userId before editing
    if (editBooking.userId === req.user.id) {
        editBooking.startDate = startDate,
        editBooking.endDate = endDate

        await editBooking.save()

        return res.status(200).json(editBooking);
    }   else res.status(403).json({ message: "Forbidden" })

})


/***        Delete a Booking        ***/
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId, { include: { model: Spot }})

    if (!booking) return res.status(404).json({ message: "Booking couldn't be found" })

    //  Bookings that have started can't be deleted
    if (booking.startDate < new Date()) return res.status(403).json({ message: "Bookings that have been started can't be deleted" })

    //  Booking must be: Booking.userId === req.user.id || Spot.ownerId === req.user.id
    if (booking.userId === req.user.id || booking.Spot.ownerId === req.user.id) {
        booking.destroy()
        return res.status(200).json({ message: "Successfully deleted" })
    } else return res.status(403).json({ message: "Forbidden" })
})




module.exports = router;
