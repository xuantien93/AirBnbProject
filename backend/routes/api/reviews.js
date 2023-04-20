const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models')


router.get('/current', requireAuth, async (req, res, next) => {
    const user = req.user
    const jsonuser = user.toJSON()

    if (jsonuser) {

        const reviews = await Review.findAll({
            where: {
                userId: jsonuser.id
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                }
            }, {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
            ]
        })

        const allReviews = [];
        reviews.forEach(review => {
            const jsonreview = review.toJSON()
            allReviews.push(jsonreview)
        })

        for (let review of allReviews) {
            const spotId = review.Spot.id

            const images = await SpotImage.findAll({
                where: {
                    spotId: spotId
                }
            })
            const imageList = []
            images.forEach(image => {
                const jsonimage = image.toJSON()
                imageList.push(jsonimage)
            })

            for (let spotimage of imageList) {
                if (spotimage.preview) {
                    review.Spot.previewImage = spotimage.url
                }
            }

        }



        res.json({
            Reviews: allReviews
        })
    } else {
        res.status(401)
        return res.json({
            message: "Authentication required"
        })
    }

})

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const user = req.user
    const jsonuser = user.toJSON()
    const { url } = req.body

    const review = await Review.findOne({
        where: {
            id: req.params.reviewId
        },
        include: {
            model: ReviewImage
        }
    })

    if (!review || review.userId !== user.id) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }
    if (review.userId !== jsonuser.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }
    const imageList = review.toJSON()

    if (imageList.ReviewImages.length > 10) {
        res.status(403)
        return res.json({
            message: "Maximum number of images for this resource was reached"
        })
    }
    const newImage = await review.createReviewImage({
        url: url
    })

    res.json({
        id: newImage.id,
        url: newImage.url
    })

})


router.put('/:reviewId', requireAuth, async (req, res, next) => {

    const user = req.user
    const jsonuser = user.toJSON()

    const { review, stars } = req.body

    const newreview = await Review.findByPk(req.params.reviewId)

    if (!newreview || newreview.userId !== user.id) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }
    if (newreview.userId !== jsonuser.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }
    let err = {}
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

    if (review) newreview.review = review
    if (stars) newreview.stars = stars

    await newreview.save()
    res.json(newreview)

})


router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const user = req.user
    const jsonuser = user.toJSON()

    const review = await Review.findByPk(req.params.reviewId)

    if (!review || review.userId !== user.id) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }
    if (review.userId !== jsonuser.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    await review.destroy()
    res.json({
        message: "Successfully deleted"
    })

})


module.exports = router
