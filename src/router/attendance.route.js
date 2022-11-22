const router = require("express").Router();
const auth = require('../middleware/auth')
const { viewAttendance, updateAttendance, createAttendance } = require("../controller/attendance.controller")

router.get('/viewAttendance', viewAttendance);
router.post('/createAttendance', createAttendance);
router.post('/updateAttendance', updateAttendance);

module.exports = router;