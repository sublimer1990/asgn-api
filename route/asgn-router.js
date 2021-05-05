var router = require('express').Router();

var asgnController = require('../controller/asgn-controller');

router.get('/assignment', asgnController.showAll)
router.get('/assignment', asgnController.showAssignment);
router.post('/assignment', asgnController.addAssignment);
router.delete('/assignment', asgnController.deleteAssignment);
router.put('/assignment', asgnController.updateAssignment);

module.exports = router;