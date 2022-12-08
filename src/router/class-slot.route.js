const router = require("express").Router();
const auth = require('../middleware/auth')
const {
  deleteClassSlot,
  updateClassSlot,
  viewClassSlots,
  createClassSlot,
  viewClassSlot, slotStudent,
} = require('../controller/class-slot.controller')

router.get('/', auth.checkToken, viewClassSlots);
router.post('/add', auth.checkToken, createClassSlot)
router.get('/:id', auth.checkToken, viewClassSlot)
router.post('/update/:id', auth.checkToken, updateClassSlot)
router.delete('/delete/:id', auth.checkToken, deleteClassSlot)
router.get('/slot-student', auth.checkToken, slotStudent)

module.exports = router