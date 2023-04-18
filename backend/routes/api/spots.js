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
    minLat = parseInt(minLat);
    maxLat = parseInt(maxLat);
    minLng = parseInt(minLng);
    maxLng = parseInt(maxLng);
    minPrice = parseInt(minPrice);
    maxPrice = parseInt(maxPrice);

    const where = {};
    if (minLat) {
        where.lat = { [Op.gte]: minLat }
    }
    if (maxLat) {
        where.lat = { [Op.lte]: maxLat }
    }
    if (minLng) {
        where.lng = { [Op.gte]: minLng }
    }
    if (maxLng) {
        where.lng = { [Op.lte]: maxLng }
    }
    if (minPrice && minPrice >= 0) {
        where.price = { [Op.gte]: minPrice }
    }
    if (maxPrice && maxPrice >= 0) {
        where.price = { [Op.lte]: maxPrice }
    }
    if (minLat && maxLat && minLat > maxLat) {

        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: {
                maxLat: "Maximum latitude must be greater than minimum latitude"
            }
        });
    }
    if (minLng && maxLng && minLng > maxLng) {

        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: {
                maxLng: "Maximum longitude must be greater than minimum longitude"
            }
        });
    }
    if (minPrice && maxPrice && minPrice > maxPrice) {

        res.status(400);
        return res.json({
            message: "Bad Request",
            errors: {
                maxPrice: "Maximum price must be greater than minimum price"
            }
        });
    }

    if (!Number.isInteger(page) || page > 10) page = 1;
    if (!Number.isInteger(size) || size > 20) size = 20;
    if (page <= 0 || size <= 0) {
        res.status(400)
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
        where,
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
            if (ele.preview === true) {
                jsonspot.previewImage = ele.url
            }
            // condition true
        })

        delete jsonspot.Reviews
        delete jsonspot.SpotImages
        allSpots.push(jsonspot)
    })



    res.json({ Spots: allSpots, page, size })
})


router.get('/current', requireAuth, async (req, res, next) => {


    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [{
            model: Review
        },
        {
            model: SpotImage
        }
        ],
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
            if (ele.preview === true) {
                jsonspot.previewImage = ele.url
            }
        })

        delete jsonspot.Reviews
        delete jsonspot.SpotImages
        allSpots.push(jsonspot)
    })

    res.json({ Spots: allSpots })
})

router.get('/:spotId', async (req, res, next) => {
    const spotId = await Spot.findByPk(req.params.spotId)
    if (spotId) {
        const spots = await Spot.findOne({
            where: {
                id: req.params.spotId
            },
            include: [{
                model: SpotImage
            },
            {
                model: Review
            },
            {
                model: User, as: 'Owner'
            }
            ],
        })

        let total = 0;
        const jsonspot = spots.toJSON()

        jsonspot.Reviews.forEach(ele => {
            total += ele.stars
        })
        const avg = total / jsonspot.Reviews.length
        jsonspot.numReviews = jsonspot.Reviews.length
        jsonspot.avgStarRating = avg
        delete jsonspot.Reviews


        res.json(jsonspot)
    } else {
        res.status(400)
        return res.json({
            message: `Spot couldn't be found`
        })
    }
})

module.exports = router
