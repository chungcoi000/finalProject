const router = require('express').Router();
const { deleteParents, updateParents, viewUpdateParents, createParents, viewParents } = require('../controller/parentController')

router.get('/viewParents', viewParents)
router.post('/createParents', createParents)

router.get('/viewUpdateParents/:slug', viewUpdateParents)
router.post('/updateParents/:slug', updateParents)

router.delete('/deleteParents/:slug', deleteParents)

module.exports = router