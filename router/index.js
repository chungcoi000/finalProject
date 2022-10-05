const router = require("express").Router();
// router.get('/', home)

const TeacherRouter = require("./teacherRouter")
router.use('/teachers', TeacherRouter)

const StudentRouter = require("./studentRouter")
router.use('/students', StudentRouter)

const parentRouter = require("./parentRouter")
router.use('/parents', parentRouter)

const RoleRouter = require("./roleRouter")
router.use('/roles', RoleRouter)

const classRouter = require("./classRouter")
router.use('/class', classRouter)

const unitRouter = require("./unitRouter")
router.use('/users', unitRouter)

const class_slotRouter = require("./class_slotRouter")
router.use('/class-slots', class_slotRouter)

const ProfileRouter = require("./profileRouter")
router.use('/profiles', ProfileRouter)

const timeTableRouter = require("./timetableRouter")
router.use('/timeTables', timeTableRouter)


const authRouter = require("./authRouter")
router.use('/', authRouter)
module.exports = router;