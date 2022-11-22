const router = require("express").Router();
// router.get('/', home)

const RoleRouter = require("./role.route")
router.use('/roles', RoleRouter)

const classRouter = require("./class.route")
router.use('/class', classRouter)

const unitRouter = require("./unit.route")
router.use('/users', unitRouter)

const class_slotRouter = require("./class-slot.route")
router.use('/class-slots', class_slotRouter)

const ProfileRouter = require("./profile.route")
router.use('/profiles', ProfileRouter)

const timeTableRouter = require("./timetable.route")
router.use('/timeTables', timeTableRouter)


const authRouter = require("./auth.route")
router.use('/auth', authRouter)

const attendanceRouter = require("./attendance.route")
router.use('/attendance', attendanceRouter)

const subjectRouter = require("./subject.route")
router.use('/subject', subjectRouter)

const slotRouter = require("./slot.route")
router.use('/slot', slotRouter)

const PostRouter = require("./post.route")
router.use('/post', PostRouter)
module.exports = router;