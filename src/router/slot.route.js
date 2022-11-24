const router = require('express').Router();
const auth = require('../middleware/auth')
const { createSlot, getSlots} = require('../controller/slot.controller')

router.post('/createSlot', auth.checkToken, createSlot);
router.get('/', auth.checkToken, getSlots);

module.exports = router