const router = require('express').Router();
const auth = require('../middleware/auth')
const {deleteRole, updateRole, viewRoles, createRole, viewRole} = require('../controller/role.controller')

router.get('/',auth.checkToken, viewRole);
router.post('/add', auth.checkToken,createRole);
router.get('/:slug', auth.checkToken,viewRoles);
router.post('/update/:slug', auth.checkToken,updateRole);
router.delete('/delete/:slug',auth.checkToken, deleteRole);

module.exports = router