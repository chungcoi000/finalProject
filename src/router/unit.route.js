const router = require('express').Router();
const auth = require('../middleware/auth')
const {viewUnit, createUnit, updateUnit, deleteUnit, viewUnits} = require('../controller/unit.controller')

router.get('/',auth.checkToken, viewUnits)
router.post('/add', auth.checkToken,createUnit)

router.get('/:slug',auth.checkToken, viewUnit)
router.post('/update/:slug',auth.checkToken, updateUnit)

router.delete('/delete/:slug',auth.checkToken, deleteUnit)

module.exports = router