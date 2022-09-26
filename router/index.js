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

const studentTimeTableRouter = require("./studentTimeTableRouter")
router.use('/studentTimeTable', studentTimeTableRouter)

const teacherTimeTableRouter = require("./teacherTimeTableRoter")
router.use('/teacherTimeTable', teacherTimeTableRouter)


module.exports = router;