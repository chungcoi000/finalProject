const router = require('express').Router();
const { viewUnit, createUnit, viewUpdateUnit, updateUnit, deleteUnit } = require('../controller/unitController')

router.get('/viewunit', viewUnit)
router.post('/createTeacer', createUnit)

router.get('/viewUpdateunit/:slug', viewUpdateUnit)
router.post('/updateunit/:slug', updateUnit)

router.delete('/deleteunit/:slug', deleteUnit)

module.exports = router