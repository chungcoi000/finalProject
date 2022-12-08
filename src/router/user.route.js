const router = require('express').Router();
const auth = require('../middleware/auth')
const multer = require("multer");
const {
  searchUser, viewParents, addUser, updateUser, getTeachers, getUser, deleteUser, getStudents, updateUserAvatar,
  getUserByClass, getUserByUnit, getTeacherBySubject, getTeacherByClass, updatePassword
} = require('../controller/user.controller')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads");
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split(".");
    const ext = arr[arr.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
});
const upload = multer({storage: storage});

router.get('/getParents', auth.checkToken, viewParents)
router.get('/getTeachers', auth.checkToken, getTeachers)
router.get('/getStudents', auth.checkToken, getStudents)
router.get('/getUserByClass/:id', auth.checkToken, getUserByClass)
router.get('/getUserByUnit/:id', auth.checkToken, getUserByUnit)
router.get('/getTeacherBySubject/:id', auth.checkToken, getTeacherBySubject)
router.get('/getTeacherByClass', auth.checkToken, getTeacherByClass)
router.get('/search', auth.checkToken, searchUser)
router.post('/add', auth.checkToken, addUser)
router.post("/updatePassword", auth.checkToken, updatePassword);
router.get('/:id', auth.checkToken, getUser)
router.post('/update/:id', auth.checkToken, updateUser)
router.delete('/delete/:id', auth.checkToken, deleteUser)
router.post('/updateAvatar', auth.checkToken, upload.single('avatar'), updateUserAvatar)


module.exports = router