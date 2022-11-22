const router = require("express").Router()
const {register, login, logout} = require("../controller/auth.controller")

// register router
router.post('/register', register)
// login router
router.post('/login', login)
//logout router
router.post('/logout', logout)

module.exports = router;