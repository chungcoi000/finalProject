const router = require('express').Router();
const auth = require('../middleware/auth')
const { createPost, deleteClass, getClass, upClass, getClasses, addClass, updateClass } = require('../controller/class.controller')


const multer = require("multer");
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

var cpUpload = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'file', maxCount: 5 },
]);


router.get('/', auth.checkToken,getClasses);
router.post('/add',auth.checkToken, addClass);
router.post('/upClass', auth.checkToken,upClass);
router.get('/:slug', auth.checkToken,getClass);
router.post('/update/:slug',auth.checkToken, updateClass);
router.post('/createPost',auth.checkToken, cpUpload, createPost)
router.delete('/delete/:slug',auth.checkToken, deleteClass);

module.exports = router