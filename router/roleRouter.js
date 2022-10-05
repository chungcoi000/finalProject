const router = require('express').Router();
const { deleteRole, updateRole, viewRoles, createRole, viewRole } = require('../controller/roleController')

router.get('/', viewRole);
router.post('/add', createRole);
router.get('/:slug', viewRoles);
router.post('/update/:slug', updateRole);
router.delete('/delete/:slug', deleteRole);

module.exports = router