const router = require("express").Router();
const auth = require('../middleware/auth')
const {
  deleteClassSlot,
  updateClassSlot,
  viewClassSlots,
  createClassSlot,
  viewClassSlot
} = require('../controller/class-slot.controller')

router.get('/', auth.checkToken, viewClassSlots)
router.post('/add', auth.checkToken, createClassSlot)
router.get('/:slug', auth.checkToken, viewClassSlot)
router.post('/update/:slug', auth.checkToken, updateClassSlot)
router.delete('/delete/:slug', auth.checkToken, deleteClassSlot)

module.exports = router