var router = require('express').Router();

var asgnController = require('../controller/asgn-controller');

router.get('/assignment', asgnController.showAssignment);
router.post('/assignment', asgnController.addAssignment);


module.exports = router;