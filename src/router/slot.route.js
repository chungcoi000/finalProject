const router = require('express').Router();
const auth = require('../middleware/auth')
const { createSlot } = require('../controller/slot.controller')

router.get('/createSlot', auth.checkToken, createSlot);

module.exports = router