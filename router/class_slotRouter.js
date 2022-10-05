const router = require("express").Router();
const {
    deleteClass_Slot,
    updateClass_Slot,
    viewClass_Slots,
    createClass_slot
} = require('../controller/class_slotController')

router.get('/', viewClass_Slots)
router.post('/add', createClass_slot)
router.post('/update/:slug', updateClass_Slot)
router.delete('/delete/:slug', deleteClass_Slot)

module.exports = router