const router = require('express').Router();
const {viewUnit, createUnit, updateUnit, deleteUnit, viewUnits} = require('../controller/unit.controller')

router.get('/', viewUnits)
router.post('/add', createUnit)

router.get('/:slug', viewUnit)
router.post('/update/:slug', updateUnit)

router.delete('/delete/:slug', deleteUnit)

module.exports = router