const express = require('express');
const router = express.Router();
const Controller = require("../controller/product_controller")
const {verifyToken} = require('../utils/validator');
const {saveMultipleFiles} = require('../utils/gallery');


router.post("/",verifyToken,saveMultipleFiles,Controller.add)
router.post("/json",verifyToken,Controller.add2)
router.get("/:id",verifyToken,Controller.getById)
router.get("/paginate/:index",verifyToken,Controller.paginate)
router.patch("/:id",verifyToken,Controller.modify)
router.delete("/:id",verifyToken,Controller.drop)
module.exports = router;