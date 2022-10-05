const router = require('express').Router();
const {
  deleteParents,
  updateParents,
  viewUpdateParents,
  createParents,
  viewParents
} = require('../controller/parent.controller')

router.get('/', viewParents)
router.post('/add', createParents)

router.get('/:slug', viewUpdateParents)
router.post('/update/:slug', updateParents)

router.delete('/delete/:slug', deleteParents)

module.exports = router