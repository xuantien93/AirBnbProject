const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models')

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [{
            model: Review
        },
        {
            model: SpotImage
        }
        ]
    })

    const allSpots = [];
    spots.forEach(spot => {
        let total = 0;
        const jsonspot = spot.toJSON()
        jsonspot.Reviews.forEach(ele => {
            total += ele.stars
        })
        jsonspot.SpotImages.forEach(ele => {
            jsonspot.previewImage = ele.url
        })
        const avg = total / jsonspot.Reviews.length
        jsonspot.avgRating = avg

        delete jsonspot.Reviews
        delete jsonspot.SpotImages
        allSpots.push(jsonspot)
    })



    res.json({ Spots: allSpots })
})



module.exports = router
