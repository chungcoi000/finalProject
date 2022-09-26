const router = require('express').Router();

router.get('/viewclass', viewclass)
router.post('/createclass', createclass)

router.get('/viewUpdateclass/:id', viewUpdateclass)
router.post('/updateclass/:id', updateclass)

router.delete('/deleteclass/:id', deleteclass)

module.exports = router