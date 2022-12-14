const router = require("express").Router();
// router.get('/', home)

const RoleRouter = require("./role.route")
router.use('/roles', RoleRouter)

const classRouter = require("./class.route")
router.use('/class', classRouter)

const unitRouter = require("./unit.route")
router.use('/units', unitRouter)

const userRouter = require("./user.route")
router.use('/users', userRouter)

const class_slotRouter = require("./class-slot.route")
router.use('/class-slots', class_slotRouter)

const ProfileRouter = require("./profile.route")
router.use('/profile', ProfileRouter)

const timeTableRouter = require("./timetable.route")
router.use('/timetable', timeTableRouter)

const authRouter = require("./auth.route")
router.use('/auth', authRouter)

const attendanceRouter = require("./attendance.route")
router.use('/attendances', attendanceRouter)

const subjectRouter = require("./subject.route")
router.use('/subjects', subjectRouter)

const slotRouter = require("./slot.route")
router.use('/slots', slotRouter)

const dateRouter = require("./date.route")
router.use('/dates', dateRouter)

const PostRouter = require("./post.route")
router.use('/posts', PostRouter)
module.exports = router;