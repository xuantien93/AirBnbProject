const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models')



router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const user = req.user

    const image = await ReviewImage.findOne({
        where: {
            id: req.params.imageId
        },
        include: {
            model: Review
        }
    })



    if (!image) {
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found"
        })
    }

    if (image.Review.userId !== user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    await image.destroy()
    res.json({
        message: "Successfully deleted"
    })

})


module.exports = router
