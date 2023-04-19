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

    if (!review) {
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
    console.log(imageList)
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


module.exports = router
