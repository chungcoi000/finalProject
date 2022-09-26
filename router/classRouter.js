const router = require('express').Router();
const { deleteclass, updateclass, viewUpdateclass, createclass, viewclass } = require('../controller/classController')

router.get('/viewclass', viewclass)
router.post('/createclass', createclass)

router.get('/viewUpdateclass/:slug', viewUpdateclass)
router.post('/updateclass/:slug', updateclass)

router.delete('/deleteclass/:slug', deleteclass)

module.exports = router