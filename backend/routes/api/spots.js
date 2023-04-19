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

    if (maxLat && minLat) {
        where.lat = { [Op.between]: [minLat, maxLat] }
    }
    if (minLng) {
        where.lng = { [Op.gte]: minLng }
    }
    if (maxLng) {
        where.lng = { [Op.lte]: maxLng }
    }
    if (minLng && maxLng) {
        where.lng = { [Op.between]: [minLng, maxLng] }
    }
    if (minPrice && minPrice >= 0) {
        where.price = { [Op.gte]: minPrice }
    }
    if (maxPrice && maxPrice >= 0) {
        where.price = { [Op.lte]: maxPrice }
    }
    if (minPrice && maxPrice) {
        where.price = { [Op.between]: [minPrice, maxPrice] }
    }

    let err = {}
    if (minLat && (minLat > 90 || minLat < -90)) err.minLat = "Minimum latitude is invalid"
    if (maxLat && (maxLat > 90 || maxLat < -90)) err.maxLat = "Maximum latitude is invalid"
    if (minLng && (minLng > 180 || minLng < -180)) err.minLng = "Minimum longitude is invalid"
    if (maxLng && (maxLng > 180 || maxLng < -180)) err.minLng = "Maximum longitude is invalid"
    if (minPrice && minPrice < 0) err.minPrice = "Minimum price must be greater than or equal to 0"
    if (maxPrice && maxPrice < 0) err.maxPrice = "Maximum price must be greater than or equal to 0"

    if (Object.keys(err).length) {
        res.status(400)
        return res.json({
            message: 'Bad Request',
            errors: err
        })
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

router.post('/', requireAuth, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    let err = {}

    if (!address) err.address = "Street address is required"
    if (!city) err.city = "City is required"
    if (!country) err.country = "Country is required"
    if (!state) err.state = "State is required"
    if (!lat) err.lat = "Latitude is not valid"
    if (!lng) err.lng = "Longitude is not valid"
    if (name && name.length > 50) err.name = "Name must be less than 50 characters"
    if (!description) err.description = "Description is required"
    if (!price) err.price = "Price per day is required"

    if (Object.keys(err).length) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: err
        })
    }

    const newspot = await Spot.create({
        ownerId: req.user.id,
        address, city, state, country, lat, lng, name, description, price
    })

    res.status(201)
    res.json(newspot)
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const user = req.user
    const jsonuser = user.toJSON() // 4
    const { url, preview } = req.body

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })
    // const jsonspot = spot.toJSON() // 10
    if (!spot || spot.ownerId !== jsonuser.id) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    } else {
        const image = await SpotImage.create({
            url, preview
        })

        res.json({
            id: image.id,
            url: image.url,
            preview: image.preview
        })
    }

})

router.put('/:spotId', requireAuth, async (req, res, next) => {
    const user = req.user
    const jsonuser = user.toJSON()
    let { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    // const jsonspot = spot.toJSON()
    // console.log(jsonspot)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    if (spot.ownerId !== jsonuser.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    let err = {}

    if (!address) err.address = "Street address is required"
    if (!city) err.city = "City is required"
    if (!country) err.country = "Country is required"
    if (!state) err.state = "State is required"
    if (!lat) err.lat = "Latitude is not valid"
    if (!lng) err.lng = "Longitude is not valid"
    if (name && name.length > 50) err.name = "Name must be less than 50 characters"
    if (!description) err.description = "Description is required"
    if (!price) err.price = "Price per day is required"

    if (Object.keys(err).length) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: err
        })
    }

    if (address) spot.address = address
    if (city) spot.city = city
    if (state) spot.state = state
    if (country) spot.country = country
    if (lat) spot.lat = lat
    if (lng) spot.lng = lng
    if (name) spot.name = name
    if (description) spot.description = description
    if (price) spot.price = price

    await spot.save()
    res.json(spot)


})

router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const user = req.user
    const jsonuser = user.toJSON()
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    if (spot.ownerId !== jsonuser.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }
    await spot.destroy()
    res.json({
        message: "Succesfully deleted"
    })

})



module.exports = router
