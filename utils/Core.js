const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const redis = require("async-redis").createClient({
    retry_strategy: () => undefined,
});

redis.on("error", (error) => {
    console.warn("Redis unavailable:", error.message);
});


const RDB = {
    set : async (key,value) => {
        try {
            return await redis.set(key, JSON.stringify(value));
        } catch (error) {
            console.warn("Redis set skipped:", error.message);
            return null;
        }
    },
    get : async (key) => {
        try {
            let data = await redis.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.warn("Redis get skipped:", error.message);
            return null;
        }
     }
}
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

module.exports = { Msg  , Encoder , JWTHandler ,RDB};
