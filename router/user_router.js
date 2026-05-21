const express = require('express');
const router = express.Router();
const Controller = require('../controller/user_controller');


const verifyToken = async (req , res , next) => {
    let authHeader = req.headers.authorization;
     if(authHeader){
        let token = authHeader.split(" ")[1];
        console.log(token);
        next();
     }else{
        next(new Error("Unauthorized"));
     }
}



router.post('/register',Controller.register);
router.post('/login',Controller.login);
router.get('/getme',verifyToken,Controller.getMe);
router.get('/getAll',Controller.getAll);
router.delete('/:id',Controller.deleteUser);


module.exports = router;
