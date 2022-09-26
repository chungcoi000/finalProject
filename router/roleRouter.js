const router = require('express').Router();

router.get('/viewRole', viewRole)
router.post('/createTeacer', createRole)

router.get('/viewUpdateRole/:id', viewUpdateRole)
router.post('/updateRole/:id', updateRole)

router.delete('/deleteRole/:id', deleteRole)

module.exports = router