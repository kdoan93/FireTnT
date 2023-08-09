const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Rating, SpotImage, Review } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');
// const bcrypt = require('bcryptjs');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//  Validate new Spots created
const validateSpot = [
    check('address').exists({ checkFalsy: true }).withMessage('Street address is required'),
    check('city').exists({ checkFalsy: true }).withMessage('City is required'),
    check('state').exists({ checkFalsy: true }).withMessage('State is required'),
    check('country').exists({ checkFalsy: true }).withMessage('Country is required'),
    check('lat').exists({ checkFalsy: true }).withMessage('Latitude is not valid'),
    check('lng').exists({ checkFalsy: true }).withMessage('Longitude is not valid'),
    check('name').exists({ checkFalsy: true }).isLength({ min: 1, max: 50 }).withMessage('Name must be less than 50 characters'),
    check('description').exists({ checkFalsy: true }).withMessage('Description is required'),
    check('price').exists({ checkFalsy: true }).withMessage('Price per day is required'),
    handleValidationErrors
];


//  Validate review
const validateReview = [
    check('review').exists({ checkFalsy: true }).withMessage('Review text is required'),
    check('stars').exists({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];


//  Create new spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    //  Create a new spot
    const newSpot = await Spot.create({
        ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price
    });
    return res.status(201).json( newSpot )
})


//  Get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    return res.status(200).json({ Spots: spots })
})


//  Get details for a Spot from an ID
router.get('/:id', async (req, res) => {
    const spots = await Spot.findByPk(req.params.id)
    return res.status(200).json( spots )
})


//  Router to create a review
router.post('/:spotId/reviews', requireAuth, validateReview, async(req, res) => {
    const { review, stars } = req.body;

    //  Check if spot exists
    const spotExists = await Spot.findByPk(req.params.spotId)
    if (!spotExists) return res.status(404).json({ message: "Spot couldn't be found" })

    //  Check if user has made review on select spot yet
    const hasReviewed = await Review.findOne({ where: { spotId: req.params.spotId, userId: req.user.id } })
    if (hasReviewed) return res.status(500).json({ message: "User already has a review for this spot" });

    //  Creating a new review
    const newReview = await Review.create({
        userId: req.user.id, spotId: parseInt(req.params.spotId), review, stars
    });
    return res.status(201).json(newReview)
})




module.exports = router;
