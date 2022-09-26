const router = require("express").Router();

// router.get('/', home)

const UserRouter = require("./userRouter")
router.use('/user', UserRouter)



module.exports = router;