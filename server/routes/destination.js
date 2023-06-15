const express = require('express')
const router = express.Router()

const {
    getDestinationInfo
} = require('../controllers/destination')

router.post('/', getDestinationInfo)

module.exports = router