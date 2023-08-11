const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');
const router = express.Router();


/***        Get all ReviewImages    FOR TESTING        ***/
router.get('/', async (req, res) => {
    const allImages = await ReviewImage.findAll({
        include: { model: Review, attributes: ['userId'] }
    })
    return res.json(allImages)
})


/***        Get all ReviewImages by id    FOR TESTING        ***/
router.get('/:reviewImageId', async (req, res) => {
    const allImages = await ReviewImage.findAll({
        include: { model: Review, attributes: ['userId'] }
    })

    return res.json(allImages)
})


/***        Delete a ReviewImage        ***/
router.delete('/:imageId', requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: { model: Review }
    })

    if (!reviewImage) return res.status(404).json({ messsage: "Review Image couldn't be found" });

    if (reviewImage.Review.userId === req.user.id) {
        await reviewImage.destroy()
        return res.status(200).json({ message: "Successfully deleted" })
    } else res.status(403).json({ message: "Forbidden" })
})




module.exports = router;
