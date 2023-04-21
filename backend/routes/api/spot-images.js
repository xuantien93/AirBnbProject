const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models')


router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const user = req.user

    const spotimage = await SpotImage.findOne({
        where: {
            id: req.params.imageId
        },
        include: {
            model: Spot
        }
    })
    // console.log(spotimage.Spot)

    if (!spotimage) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }

    if (spotimage.Spot.ownerId !== user.id) {
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
