const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models')


router.get('/', requireAuth, async (req, res, next) => {

})




module.exports = router
