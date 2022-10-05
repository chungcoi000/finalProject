const router = require("express").Router();
const {
  deleteClassSlot,
  updateClassSlot,
  viewClassSlots,
  createClassSlot,
  viewClassSlot
} = require('../controller/class-slot.controller')

router.get('/', viewClassSlots)
router.post('/add', createClassSlot)
router.get('/:slug',viewClassSlot)
router.post('/update/:slug', updateClassSlot)
router.delete('/delete/:slug', deleteClassSlot)

module.exports = router