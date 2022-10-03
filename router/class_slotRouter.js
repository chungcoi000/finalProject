const router = require("express").Router();
const { deleteClass_Slot, updateClass_Slot, viewClass_Slot, createClass_slot } = require('../controller/class_slotController')

router.get('/viewTimeTable', viewClass_Slot)
router.post('/createTimeTable', createClass_slot)

router.post('/viewTimeTable/:slug', updateClass_Slot)

router.delete('/deleteTimetable/:slug', deleteClass_Slot)

module.exports = router