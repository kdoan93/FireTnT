const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Review, Spots, User, ReviewImages } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)

    //  If review doesn't exist, throw error
    if(!review) return res.status(404).json({ message: "Review couldn't be found" })

    //  Check if current userId is same as Reviews.userId
    if(review.userId === req.user.id) {
        await review.destroy()
        return res.status(200).json({ message: "Successfully deleted!"})
    } else res.status(403).json({ message: "Forbidden" })

    //  Finds review by reviewId
    // const review = await Review.findByPk(req.params.reviewId)


    // //  Confirm review is created by current user before allowing to delete review
    // //  Delete review and return deletion success message
    // const usersReview = await Review.findOne({ where: { userId: req.user.id } })
    // if (usersReview) await review.destroy()
    // return res.status(200).json({ message: "Successfully deleted" })
})




module.exports = router;
