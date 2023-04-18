const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models')

router.get('/', async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;


    page = parseInt(page);
    size = parseInt(size);

    if (!Number.isInteger(page) || page > 10) page = 1;
    if (!Number.isInteger(size) || size > 20) size = 20;
    if (page <= 0 || size <= 0) {
        res.status(400)

        console.log('hi')
        return res.json({
            message: "Bad Request",
            errors: {
                page: "Page must be greater than or equal to 1",
                size: "Size must be greater than or equal to 1",
            }
        })
    }

    let pagination = {}

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }



    const spots = await Spot.findAll({
        include: [{
            model: Review
        },
        {
            model: SpotImage
        }
        ],
        ...pagination
    })



    const allSpots = [];
    spots.forEach(spot => {
        let total = 0;
        const jsonspot = spot.toJSON()

        jsonspot.Reviews.forEach(ele => {
            total += ele.stars
        })
        const avg = total / jsonspot.Reviews.length
        jsonspot.avgRating = avg

        jsonspot.SpotImages.forEach(ele => {
            jsonspot.previewImage = ele.url
        })

        delete jsonspot.Reviews
        delete jsonspot.SpotImages
        allSpots.push(jsonspot)
    })



    res.json({ Spots: allSpots, page, size })
})


router.get('/current', requireAuth, async (req, res, next) => {

})


module.exports = router
