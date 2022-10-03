const router = require("express").Router();
// router.get('/', home)

const TeacherRouter = require("./teacherRouter")
router.use('/teacher', TeacherRouter)

const StudentRouter = require("./studentRouter")
router.use('/student', StudentRouter)

const parentRouter = require("./parentRouter")
router.use('/parent', parentRouter)

const RoleRouter = require("./roleRouter")
router.use('/Role', RoleRouter)

const classRouter = require("./classRouter")
router.use('/class', classRouter)

const unitRouter = require("./unitRouter")
router.use('/user', unitRouter)

const class_slotRouter = require("./class_slotRouter")
router.use('/class_slot', class_slotRouter)

const ProfileRouter = require("./profileRouter")
router.use('/profile', ProfileRouter)

const timeTableRouter = require("./timetableRouter")
router.use('/timeTable', timeTableRouter)


const authRouter = require("./authRouter")
router.use('/', authRouter)
module.exports = router;