const router = require("express").Router()
const { register, login } = require("../controller/authController")


// register router
router.post('/register', register)
// login router
router.post('/login', login)


module.exports = router;