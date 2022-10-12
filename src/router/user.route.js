const router = require('express').Router();
const { viewParents, addUser, updateUser, getTeachers, getUser, deleteUser, getStudents } = require('../controller/user.controller')

router.get('/getParents', viewParents)
router.post('/getTeachers', getTeachers)
router.post('/getStudents', getStudents)
router.post('/addUser', addUser)
router.get('/:slug', getUser)
router.post('/update/:slug', updateUser)
router.delete('/delete/:slug', deleteUser)

module.exports = router