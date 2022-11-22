const router = require('express').Router();
const auth = require('../middleware/auth')
const multer = require("multer");
const { search, viewParents, addUser, updateUser, getTeachers, getUser, deleteUser, getStudents, updateUserAvatar } = require('../controller/user.controller')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        const arr = file.originalname.split(".");
        const ext = arr[arr.length - 1];
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
    },
});
const upload = multer({ storage: storage });

router.get('/getParents', auth.checkToken, viewParents)
router.post('/getTeachers', auth.checkToken, getTeachers)
router.post('/getStudents', auth.checkToken, getStudents)
router.post('/addUser', auth.checkToken, addUser)
router.get('/:slug', auth.checkToken, getUser)
router.post('/update/:slug', auth.checkToken, updateUser)
router.get('/search', auth.checkToken, search)
router.delete('/delete/:slug', auth.checkToken, deleteUser)
routerpost('updateAvatar', auth.checkToken, upload.single('avatar'), updateUserAvatar)

module.exports = router