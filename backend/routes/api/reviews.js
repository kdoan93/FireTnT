const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Review, Spots, User, ReviewImages } = require('../../db/models');
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
