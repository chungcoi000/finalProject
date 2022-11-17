const router = require('express').Router();
const auth = require('../middleware/auth')
const { search, viewParents, addUser, updateUser, getTeachers, getUser, deleteUser, getStudents } = require('../controller/user.controller')

router.get('/getParents', auth.checkToken, viewParents)
router.post('/getTeachers', auth.checkToken, getTeachers)
router.post('/getStudents', auth.checkToken, getStudents)
router.post('/addUser', auth.checkToken, addUser)
router.get('/:slug', auth.checkToken, getUser)
router.post('/update/:slug', auth.checkToken, updateUser)
router.get('/search', auth.checkToken, search)
router.delete('/delete/:slug', auth.checkToken, deleteUser)

module.exports = router