const router = require("express").Router();
// router.get('/', home)

const TeacherRouter = require("./teacher.route")
router.use('/teachers', TeacherRouter)

const StudentRouter = require("./student.route")
router.use('/students', StudentRouter)

const parentRouter = require("./parent.route")
router.use('/parents', parentRouter)

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
router.use('/', authRouter)
module.exports = router;