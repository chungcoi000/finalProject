const router = require('express').Router();
const {viewUnit, createUnit, updateUnit, deleteUnit, viewUnits} = require('../controller/unit.controller')

router.get('/view-units', viewUnits)
router.post('/create-unit', createUnit)

router.get('/view-unit/:slug', viewUnit)
router.post('/update-unit/:slug', updateUnit)

router.delete('/delete-unit/:slug', deleteUnit)

module.exports = router