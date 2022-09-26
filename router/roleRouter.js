const router = require('express').Router();
const { deleteRole, updateRole, viewRoles, createRole, viewRole } = require('../controller/roleController')

router.get('/view-role', viewRole)
router.post('/create-role', createRole)

router.get('/viewRoles/:slug', viewRoles)
router.post('/updateRole/:slug', updateRole)

router.delete('/deleteRole/:slug', deleteRole)

module.exports = router