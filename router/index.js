const express = require('express');//Imports the Express framework
const router = express.Router();
const authcontroller = require('../controller/auth');

router.post('/register', authcontroller.register);
router.post('/login',authcontroller.login);
router.put('/users/:uc_uuid', authcontroller.user);
router.delete('/userdata/:uc_uuid',authcontroller.userdata);
router.patch('/updateData/:uc_uuid',authcontroller.updateData);


module.exports = router;