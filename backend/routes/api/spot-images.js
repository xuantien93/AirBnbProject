const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models')


router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const user = req.user

    const spotimage = await SpotImage.findAll({
        where: {
            spotId: req.params.imageId
        }
    })

    if (!spotimage) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }

    if (spotimage.ownerId !== user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    await spotimage.destroy()
    res.json({
        message: "Successfully deleted"
    })
})


module.exports = router
