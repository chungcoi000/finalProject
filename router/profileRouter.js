const router = require('express').Router();
const { viewProfile } = require('../controller/profileController')


router.get('/viewProfile', viewProfile)

module.exports = router