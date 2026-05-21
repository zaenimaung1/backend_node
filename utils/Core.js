const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");


const Msg = ( res, msg = "" , result = {} ) => {
    res.status(200).json({
        con : true,
        msg,
        result
    })

}

//encode psw
const Encoder =  {
    encode : (password) => bcrypt.hashSync(password,10),
    compare : (plain , hash) => bcrypt.compareSync(plain,hash)

}

//JWT
const JWTHandler = {
    make : (payload) => JWT.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn : "1h"}),
}

module.exports = { Msg  , Encoder , JWTHandler};