const router = require('express').Router();
const {viewProfile} = require('../controller/profile.controller')

router.get('/viewProfile', viewProfile)

module.exports = router