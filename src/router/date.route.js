const router = require('express').Router();
const auth = require('../middleware/auth')
const {getDates} = require("../controller/date.controller");

router.get('/', auth.checkToken, getDates);

module.exports = router