const express = require('express');
const router = express.Router();
const Controller = require('../controller/category_controller');
const {verifyToken} = require('../utils/validator');
const {saveSingleFile } = require('../utils/gallery');


router.get('/', verifyToken, Controller.all);
router.get('/:id', verifyToken, Controller.getById);
router.post('/', verifyToken, saveSingleFile, Controller.create);
router.patch('/:id', verifyToken, Controller.modify);
router.delete('/:id', verifyToken, Controller.drop);



module.exports = router;