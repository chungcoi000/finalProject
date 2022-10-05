const router = require('express').Router();
const {deleteClass, getClass, getClasses, addClass, updateClass} = require('../controller/classController')

router.get('/', getClasses);
router.post('/add', addClass);
router.get('/:slug', getClass);
router.post('/update/:slug', updateClass);
router.delete('/delete/:slug', deleteClass);

module.exports = router