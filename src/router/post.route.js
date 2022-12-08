const router = require('express').Router();
const auth = require('../middleware/auth')
const { deletePost, updatePost, getPost, getPosts, createPost } = require('../controller/post.controller')

router.get('/', auth.checkToken, getPosts)
router.post('/add', auth.checkToken, createPost)
router.get('/:id', auth.checkToken, getPost)
router.post('/update/:id', auth.checkToken, updatePost)
router.delete('/delete/:id', auth.checkToken, deletePost)

module.exports = router