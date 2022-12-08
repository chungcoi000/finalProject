const router = require('express').Router();
const auth = require('../middleware/auth')
const { viewProfile } = require('../controller/profile.controller')

router.get('/', auth.checkToken, viewProfile)

module.exports = router