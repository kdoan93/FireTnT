const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');
const router = express.Router();

/***        Get all spot-images ***for testing***       ***/
router.get('/', async (req, res) => {
    const images = await SpotImage.findAll({include: { model: Spot, attributes: ['ownerId'] }})
    return res.json(images)
})


/***        Delete a SpotImage      ***/
router.delete('/:imageId', requireAuth, async (req, res) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: { model: Spot }
    });

    //  If not spotImage found, return error message
    if (!spotImage) return res.status(404).json({ message: "Spot Image couldn't be found" });

    if (spotImage.Spot.ownerId === req.user.id) {
        await spotImage.destroy()
        return res.status(200).json({ message: "Successfully deleted" })
    } else res.status(403).json({ message: "Forbidden" })

})




module.exports = router;
