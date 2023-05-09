const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Op, json } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models')

router.get('/', async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    let where = {};
    if (page && size && minLat) {
        where.lat = { [Op.gte]: parseInt(minLat) };
    }

    if (minLat) {
        where.lat = { [Op.gte]: parseInt(minLat) }
    }

    if (page && size && maxLat) {
        where.lat = { [Op.gte]: parseInt(maxLat) }
    }

    if (maxLat) {
        where.lat = { [Op.lte]: parseInt(maxLat) };
    }

    if (minLat && maxLat) {
        where.lat = { [Op.between]: [parseInt(minLat), parseInt(maxLat)] };
    }

    if (page && size && minLat && maxLat) {
        where.lat = { [Op.between]: [parseInt(minLat), parseInt(maxLat)] };
    }

    if (page && size && minLng) {
        where.lng = { [Op.gte]: parseInt(minLng) };
    }

    if (minLng) {
        where.lng = { [Op.gte]: parseInt(minLng) };
    }

    if (minLng === 0) {
        where.lng = { [Op.gte]: parseInt(minLng) };
    }


    if (page && size && minLng) {
        where.lng = { [Op.gte]: parseInt(minLng) };
    }

    if (maxLng) {
        where.lng = { [Op.lte]: parseInt(maxLng) };
    }

    if (maxLng === 0) {
        where.lng = { [Op.lte]: parseInt(maxLng) };
    }

    if (page && size && maxLng) {
        where.lng = { [Op.lte]: parseInt(maxLng) };
    }

    if (minLng && maxLng) {
        where.lng = { [Op.between]: [parseInt(minLng), parseInt(maxLng)] };
    }

    if (page && size && minLng && maxLng) {
        where.lng = { [Op.between]: [parseInt(minLng), parseInt(maxLng)] };
    }

    if (minPrice >= 0) {
        where.price = { [Op.gte]: parseInt(minPrice) };
    }

    if (page && size && minPrice >= 0) {
        where.price = { [Op.gte]: parseInt(minPrice) };
    }

    if (maxPrice >= 0) {
        where.price = { [Op.lte]: parseInt(maxPrice) };
    }

    if (page && size && maxPrice >= 0) {
        where.price = { [Op.lte]: parseInt(maxPrice) };
    }

    if (minPrice >= 0 && maxPrice >= 0) {
        where.price = { [Op.between]: [parseInt(minPrice), parseInt(maxPrice)] };
    }

    if (page && size && minPrice >= 0 && maxPrice >= 0) {
        where.price = { [Op.between]: [parseInt(minPrice), parseInt(maxPrice)] };
    }

    let err = {};

    if (page < 1) {
        err.page = "Page must be greater than or equal to 1";
    }

    if (size < 1) {
        err.size = "Size must be greater than or equal to 1";
    }

    if (minLat > 90 || minLat < -90) {
        err.minLat = "Minimum latitude is invalid";
    }

    if (maxLat > 90 || maxLat < -90) {
        err.maxLat = "Maximum latitude is invalid";
    }

    if (minLng > 180 || minLng < -180) {
        err.minLng = "Minimum longitude is invalid";
    }

    if (maxLng > 180 || maxLng < -180) {
        err.maxLng = "Maximum longitude is invalid";
    }

    if (minPrice < 0) {
        err.minPrice = "Minimum price must be greater than or equal to 0";
    }

    if (maxPrice < 0) {
        err.maxPrice = "Maximum price must be greater than or equal to 0";
    }

    if (isNaN(minLat) && minLat !== undefined) err.minLat = "Minimum latitude is invalid";
    if (isNaN(maxLat) && maxLat !== undefined) err.maxLat = "Maximum latitude is invalid";
    if (isNaN(minLng) && minLng !== undefined) err.minLng = "Minimum longtitude is invalid";
    if (isNaN(maxLng) && maxLng !== undefined) err.maxLng = "Maximum longtitude is invalid";
    if (isNaN(minPrice) && minPrice !== undefined) err.minPrice = "Mininum price is invalid";
    if (isNaN(maxPrice) && maxPrice !== undefined) err.maxPrice = "Maximum price is invalid";
    if (isNaN(page) && page !== undefined) err.page = "Page is invalid";
    if (isNaN(size) && size !== undefined) err.size = "Size is invalid";


    if (Object.keys(err).length) {
        res.status(400);
        return res.json({
            message: 'Bad Request',
            errors: err
        });
    }

    page = parseInt(page) || 1
    size = parseInt(size) || 20

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
        jsonspot.avgRating = avg.toFixed(1)
        if (jsonspot.avgRating === "NaN") {
            jsonspot.avgRating = "No ratings for this spot yet"
        }

        jsonspot.SpotImages.forEach(ele => {
            if (ele.preview === true) {
                jsonspot.previewImage = ele.url
            }
        })
        if (!jsonspot.previewImage) {
            jsonspot.previewImage = "No images found"
        }


        delete jsonspot.Reviews
        delete jsonspot.SpotImages
        allSpots.push(jsonspot)
    })


    return res.json({ Spots: allSpots, page, size })
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
        jsonspot.avgRating = avg.toFixed(1)
        if (jsonspot.avgRating === "NaN") {
            jsonspot.avgRating = "No ratings for this spot yet"
        }

        jsonspot.SpotImages.forEach(ele => {
            if (ele.preview === true) {
                jsonspot.previewImage = ele.url
            }

        })
        if (!jsonspot.previewImage) {
            jsonspot.previewImage = "No images found"
        }

        delete jsonspot.Reviews
        delete jsonspot.SpotImages
        allSpots.push(jsonspot)
    })

    if (!allSpots.length) {
        res.json({ Spots: "No spots created yet" })
    } else {
        res.json({ Spots: allSpots })
    }

})

router.get('/:spotId/reviews', async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })

    }
    const reviews = await Review.findAll({
        where: {
            spotId: spot.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    const reviewList = []
    reviews.forEach(review => {
        reviewList.push(review.toJSON())
    })

    for (let review of reviewList) {
        const reviewId = review.id

        const reviewimage = await ReviewImage.findAll({
            where: {
                reviewId: reviewId
            }
        })
        const reviewimagelist = []
        reviewimage.forEach(image => {
            reviewimagelist.push(image.toJSON())
        })
        if (!reviewimagelist.length) {
            review.ReviewImages = "No images found"
        }
    }


    res.json({
        Reviews: reviewList
    })

})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const user = req.user
    const jsonuser = user.toJSON()

    if (jsonuser) {

        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            res.status(404)
            return res.json({
                message: "Spot couldn't be found"
            })
        }


        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        })

        const bookList = []

        bookings.forEach(booking => {
            bookList.push(booking.toJSON())
        })



        bookList.forEach(ele => {
            if (ele.userId !== jsonuser.id) {
                delete ele.id
                delete ele.User
                delete ele.createdAt
                delete ele.updatedAt
                delete ele.userId
                delete ele.Spot
            }
            ele.startDate = ele.startDate.toISOString().slice(0, 10)
            ele.endDate = ele.endDate.toISOString().slice(0, 10)
        })

        if (!bookList.length) {
            res.json({ Bookings: "No bookings created for this spot yet" })
        } else {
            res.json({
                Bookings: bookList
            })
        }

    } else {
        res.status(401)
        return res.json({
            message: "Authenticaion Required"
        })
    }



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
        jsonspot.avgStarRating = avg.toFixed(1)
        if (jsonspot.avgStarRating === "NaN") {
            jsonspot.avgStarRating = "No ratings yet"
        }
        if (!jsonspot.SpotImages.length) {
            jsonspot.SpotImages = "No images found"
        }
        delete jsonspot.Reviews
        delete jsonspot.Owner.username


        res.json(jsonspot)
    } else {
        const err = new Error(`Spot couldn't be found`)
        err.statusCode = 404
        err.title = "Uh oh"
        return next({
            title: err.title,
            message: err.message
        })
    }
})



router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const user = req.user
    const jsonuser = user.toJSON()
    const { review, stars } = req.body
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: [
            {
                model: Review
            }
        ]
    })


    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (spot.ownerId === user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    const err = {}

    if (!review) err.review = "Review text is required"
    if (!stars) err.stars = "Stars rating is required"
    if (stars && (stars < 1 || stars > 5)) err.stars = "Stars must be an integer from 1 to 5"
    if (Object.keys(err).length) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: err
        })
    }

    // const jsonspot = spot.toJSON()
    // console.log(jsonspot)

    const existingReview = await Review.findOne({
        where: {
            userId: jsonuser.id,
            spotId: spot.id
        }
    });


    if (existingReview) {
        res.status(500)
        return res.json({
            message: "User already has a review for this spot"
        })
    }

    const newReview = await Review.create({
        userId: jsonuser.id, spotId: spot.id,
        review, stars
    })
    res.json(newReview)

})


router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const user = req.user
    const jsonuser = user.toJSON()
    const { startDate, endDate } = req.body

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: [
            {
                model: Booking
            }
        ]
    })

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (spot.ownerId === user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    const endDateObj1 = new Date(endDate)
    const startDateObj1 = new Date(startDate)

    const err1 = {}
    if (!startDate) err1.startDate = "startDate is required"
    if (!endDate) err1.endDateErr = "endDate is required"
    if (Object.keys(err1).length) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: err1
        })
    }


    if (endDateObj1 <= startDateObj1) {
        res.status(403)
        return res.json({
            message: "Invalid booking dates. End date should be after the start date."
        })
    }

    const booking1 = await Booking.findAll({
        where: {
            startDate: { [Op.lte]: startDate },
            endDate: { [Op.gte]: startDate },
            spotId: spot.id
        }
    });

    const booking2 = await Booking.findAll({
        where: {
            startDate: { [Op.lte]: endDate },
            endDate: { [Op.gte]: endDate },
            spotId: spot.id
        }
    });



    const err = {}
    if (booking1.length) err.startDate = "Start date conflicts with an existing booking"
    if (booking2.length) err.endDate = "End date conflicts with an existing booking"
    if (Object.keys(err).length) {
        res.status(403)
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: err
        })
    }

    const newBooking = await Booking.build({
        spotId: spot.id, userId: jsonuser.id,
        startDate, endDate
    })
    const now = Date.now()

    const endDateObj = new Date(newBooking.startDate)
    const startDateObj = new Date(newBooking.endDate)
    if (startDateObj <= now || endDateObj <= now) {
        res.status(403)
        return res.json({
            message: "Invalid booking date. Bookings can only be made for future dates."
        })
    } else {
        await newBooking.save()
        newBooking.dataValues.startDate = newBooking.startDate.toISOString().slice(0, 10)
        newBooking.dataValues.endDate = newBooking.endDate.toISOString().slice(0, 10)
        res.json(newBooking)
    }


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
    console.log(spot)
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (spot.ownerId !== user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    const image = await SpotImage.build({
        url, preview
    })



    await image.save()
    await spot.addSpotImages(image)
    res.json({
        id: image.id,
        url: image.url,
        preview: image.preview
    })


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
