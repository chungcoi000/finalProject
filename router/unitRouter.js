const router = require('express').Router();

router.get('/viewunit', viewUnit)
router.post('/createTeacer', createUnit)

router.get('/viewUpdateunit/:id', viewUpdateUnit)
router.post('/updateunit/:id', updateUnit)

router.delete('/deleteunit/:id', deleteUnit)

module.exports = router