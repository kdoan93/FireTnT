const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Booking, User, Rating, SpotImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

/***        Validate new Spots created      ***/
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


/***        Validate review       ***/
const validateReview = [
    check('review').exists({ checkFalsy: true }).withMessage('Review text is required'),
    check('stars').exists({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];


/***        Create new spot       ***/
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    //  Create a new spot
    const newSpot = await Spot.create({
        ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price
    });
    return res.status(201).json( newSpot )
})


/***        Get all spots       ***/
router.get('/', async (req, res) => {

    //  Find all spots and include the related Review and SpotImage models data
    const spots = await Spot.findAll( { include: [ { model: Review }, { model: SpotImage } ] } );

    //  Create an array of objects
    let spotsList = [];

    //  Call .toJSON to each index of Spot array to allow data manipulation
    spots.forEach(spot => { spotsList.push(spot.toJSON()) });

    //  Iterate through spotsList to find avgRating for each spot in each index
    spotsList.forEach(spot => {
        //  Set base for avgRating
        spot.avgRating = 0;

        //  Add each review.stars to avgRating and divide by array length to get avgRating
        spot.Reviews.forEach(review => { spot.avgRating += review.stars })
        spot.avgRating = spot.avgRating / spot.Reviews.length

        //  Delete extra data not needed
        delete spot.Reviews
    })

    //  Iterate through each spotsList index to add an image.url if image.preview === true
    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => { if (image.preview === true) spot.previewImage = image.url })

        //  If image.preview === false, return message stating spot image not found
        if (!spot.previewImage) spot.previewImage = "Spot Image couldn't be found"
        // if (!spot.preview) spot.previewImage = "Spot Image couldn't be found"

        //  Remove extra data not needed
        delete spot.SpotImages
    })

    return res.status(200).json({ Spots: spotsList })
})


/***        Get all Spots owned by the Current User     ***/
router.get('/current', requireAuth, async (req, res) => {

    //  Get all spots owned by req.user.id and include related data from Review and SpotImage models
    const currentUserSpots = await Spot.findAll({
        where: { ownerId: req.user.id },
        include: [ { model: Review }, { model: SpotImage } ]
    })

    //  Create an array of objects
    let userSpots = [];

    //  Call .toJSON to each index of Spot array to allow for data manipulation
    currentUserSpots.forEach(spot => { userSpots.push(spot.toJSON())});

    //  Iterate through userSpots to get avgRating of each Spot
    userSpots.forEach(spot => {
        spot.avgRating = 0;

        spot.Reviews.forEach(review => { spot.avgRating += review.stars })
        spot.avgRating = spot.avgRating / spot.Reviews.length

        delete spot.Reviews
    })

    //  Iterate through userSpots to return a previewImage
    userSpots.forEach(spot => {
        spot.SpotImages.forEach(image => { if (image.preview === true) spot.previewImage = image.url })

        if (!spot.previewImage) spot.previewImage = "Spot Image couldn't be found"

        delete spot.SpotImages
    })

    if (!currentUserSpots) return res.status(404).json({ message: "Current user owns no spots" });

    return res.status(200).json({ Spots: userSpots })
})


/***        Get details for a Spot from an ID       ***/
router.get('/:id', async (req, res) => {
    const spots = await Spot.findByPk(req.params.id)
    return res.status(200).json( spots )
})


/***        Router to create a review       ***/
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


/***        Editing a spot      ***/
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    let editSpot = await Spot.findByPk(req.params.spotId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    //  If spot doesn't exist, throw error
    if (!editSpot) return res.status(404).json({ message: "Spot couldn't be found" })

    //  Check if req.user.id === spot.ownerId before editing
    if (editSpot.ownerId === req.user.id) {
        editSpot.address = address,
        editSpot.city = city,
        editSpot.state = state,
        editSpot.country = country,
        editSpot.lat = lat,
        editSpot.lng = lng,
        editSpot.name = name,
        editSpot.description = description,
        editSpot.price = price

        await editSpot.save()

        return res.status(200).json(editSpot);
    } else res.status(403).json({ message: "Forbidden" })
})


/***        Get all Reviews by a Spot's id      ***/
router.get('/:spotId/reviews', async (req, res) => {
    const spotsById = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    if (!spotsById.length) return res.status(404).json({ message: "Spot couldn't be found" })

    return res.status(200).json({ Reviews: spotsById })
})


/***        Add an image to a spot based on spot's id       ***/
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { url, preview } = req.body;

    //  If spot doesn't exist, throw an error
    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    //  Check if req.user.id === spot.ownerId before adding an image
    if (spot.ownerId === req.user.id) {
        spot.url = url,
        spot.preview = preview
        await spot.save()
        return res.status(200).json(Spot.id, Spot.url, Spot.preview)
    } else res.status(403).json({ message: "Forbidden" })
})


/***        Delete a spot       ***/
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    //  If spot doesn't exist, throw an error
    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    //  Check if req.user.id === spot.ownerId before deleting spot
    if (spot.ownerId === req.user.id) {
        await spot.destroy()
        return res.status(200).json({ message: "Successfully deleted" })
    } else res.status(403).json({ message: "Forbidden" })
})




module.exports = router;