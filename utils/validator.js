const JWT = require('jsonwebtoken');
const {getCacheUser} = require("./Cache");
const verifyToken = async (req , res , next) => {
    let authHeader = req.headers.authorization;
     if(authHeader){
        let token = authHeader.split(" ")[1];
        JWT.verify(token , process.env.JWT_SECRET_KEY , async (err , decoded) => {
            if(err){
                return next(new Error("Invalid token"));
            }else {
               console.log( "Decoded",decoded);
               req.userId = decoded.id;
               req.user = await getCacheUser(decoded.id);
               next();
            }
         });
      }else{
         next(new Error("No token provided"));
      }
   }

module.exports = { verifyToken };
