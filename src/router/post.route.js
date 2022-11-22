const router = require('express').Router();
const auth = require('../middleware/auth')
const { deletePost, updatePost, getPost, getPosts, createPost } = require('../controller/post.controller')


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

router.post('/create', auth.checkToken, cpUpload, createPost)
router.get('/getPosts', auth.checkToken, getPosts)
router.get('/getPost/:id', auth.checkToken, getPost)
router.post('/update/:id', auth.checkToken, updatePost)
router.delete('/delete/:id', auth.checkToken, deletePost)


module.exports = router