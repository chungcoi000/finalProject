const router = require("express").Router();
const auth = require('../middleware/auth')
const { viewAttendance, takeAttendance } = require("../controller/attendance.controller")

router.get('/viewAttendance', viewAttendance);
router.post('/takeAttendance', takeAttendance);

module.exports = router;