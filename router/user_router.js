const express = require('express');
const router = express.Router();
const Controller = require('../controller/user_controller');
const { verifyToken } = require('../utils/validator');

     



router.post('/register',Controller.register);
router.post('/login',Controller.login);
router.get('/getme',verifyToken,Controller.getMe);
router.get('/getAll',Controller.getAll);
router.delete('/:id',Controller.deleteUser);


module.exports = router;
