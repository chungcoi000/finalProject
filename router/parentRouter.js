const router = require('express').Router();

router.get('/viewParents', viewParents)
router.post('/createParents', createParents)

router.get('/viewUpdateParents/:id', viewUpdateParents)
router.post('/updateParents/:id', updateParents)

router.delete('/deleteParents/:id', deleteParents)

module.exports = router