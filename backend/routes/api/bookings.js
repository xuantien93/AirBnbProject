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

        const bookings = await Booking.findAll({
            include: [
                {
                    model: Spot,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'description']
                    }
                }
            ]
        })

        const allBookings = []
        bookings.forEach(booking => {
            const jsonbooking = booking.toJSON()
            allBookings.push(jsonbooking)
        })

        for (let booking of allBookings) {
            const spotId = booking.Spot.id

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
                    booking.Spot.previewImage = spotimage.url
                }
            }

        }

        res.json({
            Bookings: allBookings
        })

    } else {
        res.status(401)
        return res.json({
            message: "Authentication required"
        })
    }

})



module.exports = router
