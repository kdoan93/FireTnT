const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Review, Spot, User, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


//  Validations for reviews
const validateReview = [
    check('review').exists({ checkFalsy: true }).withMessage('Review text is required'),
    check('stars').exists({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];


//  Editing a review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    let editReview = await Review.findByPk(req.params.reviewId)
    const { review, stars } = req.body;

    //  If review doesn't exist, throw error
    if (!editReview) return res.status(404).json({ message: "Review couldn't be found" });

    //  Check if req.user.id === review.userId before editing
    if (editReview.userId === req.user.id) {
        editReview.review = review,
        editReview.stars = stars
        await editReview.save()

        return res.status(200).json(editReview);
    } else res.status(403).json({ message: "Forbidden" })
})


/***        Get all Reviews of the Current User     ***/
router.get('/current', requireAuth, async (req, res) => {
    const currentUserReviews = await Review.findAll({
        where: { userId: req.user.id },
        include:
        [
            { model: User, attributes: [ 'id', 'firstName', 'lastName' ] },
            { model: Spot,
                attributes:
                    [ 'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price' ],
                include:
                    [ { model: SpotImage } ]
            },
            { model: ReviewImage, attributes: [ 'id', 'url' ] },
        ]
    })

    //  Create an array to push objects in
    let reviewsList = [];

    //  Iterate through currentUserReviews array to .toJSON() each indexed object
    currentUserReviews.forEach(review => { reviewsList.push(review.toJSON()) });

    //  Iterate through reviewsList to add an image.url if image.preview === true
    //  *** SpotImages is nested in Spot object ***
    reviewsList.forEach(review => {
        review.Spot.SpotImages.forEach(image => { if (image.preview === true) {
            review.Spot.previewImage = image.url
        } } )

        if (!review.Spot.previewImage) review.Spot.previewImage = "Spot Image couldn't be found"

        delete review.Spot.SpotImages
    })

    return res.status(200).json({ Reviews: reviewsList})
})


/***        Add an image to a review based on the Review's id       ***/
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    const { url } = req.body;

    //  If review doesn't exist, throw an error
    if (!review) return res.status(404).json({ message: "Review couldn't be found" });

    //  Check if 10 ReviewImage exist per review
    const checkImagesCount = await ReviewImage.findAll( { where: { reviewId: req.params.reviewId } } )
    if (checkImagesCount.length >= 10) {
        return res.status(403).json({ message: "Maximum number of images for this resource was reached" })
    }

    //  Check if req.user.id === review.userId before adding an image
    if (review.userId === req.user.id) {
        let newReviewImage = await ReviewImage.create({ reviewId: req.params.reviewId, url })
        return res.status(200).json(newReviewImage)
    } else res.status(403).json({ message: "Forbidden" })
})


/***        Delete a review      ***/
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)

    //  If review doesn't exist, throw error
    if(!review) return res.status(404).json({ message: "Review couldn't be found" })

    //  Check if req.user.id matches review.userId before deleting review
    if(review.userId === req.user.id) {
        await review.destroy()
        return res.status(200).json({ message: "Successfully deleted!"})
    } else res.status(403).json({ message: "Forbidden" })
})




module.exports = router;
