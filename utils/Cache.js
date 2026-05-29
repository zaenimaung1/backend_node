//cache
const {RDB} = require("./Core");
const setCacheUser = async (userId , user) => {
    await RDB.set(`user:${userId}` , user);

}

const getCacheUser = async (userId) => {
    return await RDB.get(`user:${userId}`);
}

module.exports = { setCacheUser , getCacheUser };