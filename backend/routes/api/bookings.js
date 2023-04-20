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
            where: {
                userId: user.id
            },
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

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const user = req.user

    const { startDate, endDate } = req.body
    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    if (booking.userId !== user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    const endDateObj = new Date(endDate)
    const startDateObj = new Date(startDate)

    if (user.id === booking.userId) {
        const err1 = {}
        if (!startDate) err1.startDate = "startDate is required"
        if (!endDate) err1.endDateErr = "endDate is required"
        if (endDateObj.getTime() <= startDateObj.getTime()) err1.endDate = "endDate cannot come before startDate"
        if (Object.keys(err1).length) {
            res.status(400)
            return res.json({
                message: "Bad Request",
                errors: err1
            })
        }
    }

    const now = Date.now()
    if (endDateObj <= now) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified"
        })
    }

    const booking1 = await Booking.findAll({
        where: {
            startDate: { [Op.lte]: startDate },
            endDate: { [Op.gte]: startDate },
            id: booking.id
        }
    });

    const booking2 = await Booking.findAll({
        where: {
            startDate: { [Op.lte]: endDate },
            endDate: { [Op.gte]: endDate },
            id: booking.id
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

    if (startDate) booking.startDate = startDate
    if (endDate) booking.endDate = endDate

    await booking.save()
    res.json(booking)

})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const user = req.user

    const booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    if (booking.userId !== user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }
    const now = Date.now()
    if (booking.startDate.getTime() <= now) {
        res.status(403)
        return res.json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await booking.destroy()
    res.json({
        message: "Successfully deleted"
    })

})

module.exports = router
