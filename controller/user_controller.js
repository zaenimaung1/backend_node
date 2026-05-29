const userDB = require("../models/user_model");
const { Encoder, Msg, JWTHandler } = require("../utils/Core");
const { setCacheUser, getCacheUser } = require("../utils/Cache");
const register1 = async (req, res, next) => {
  const { name, phone, password } = req.body;

  try {
    // check duplicate user
    const existingUser = await userDB.findOne({
      $or: [{ name }, { phone }],
    });

    if (existingUser) {
      if (existingUser.name === name) {
        return res.status(409).json({ con: false, msg: "Name already exists" });
      }

      return res.status(409).json({ con: false, msg: "Phone already exists" });
    }

    // create user
    const user = await userDB.create({
      name,
      phone,
      password,
    });

    res.status(201).json({
      con: true,
      msg: "User registered successfully",
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        con: false,
        msg: `${field} already exists`,
      });
    }

    console.log(error);
    next(error);
  }
};

//with encode psw
const register = async (req, res, next) => {
  let { name, phone, password } = req.body;

  try {
    let findUserName = await userDB.findOne({ name });
    if (findUserName) {
      next(new Error("User name is already exit"));
      return;
    }
    let findPhone = await userDB.findOne({ phone });
    if (findPhone) {
      next(new Error("PhoneNumber is already exit"));
      return;
    }

    let EncodePsw = Encoder.encode(password);
    await new userDB({ name, phone, password: EncodePsw }).save();
    Msg(res, "Register successfull", req.body);
  } catch (error) {
    console.log(error);
  }
};

//get ALL user
const getAll = async (req, res, next) => {
  try {
    const users = await userDB.find();
    res.json({ con: true, msg: "Users retrieved successfully", data: users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//login
const login = async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  try {
    const userName = await userDB.findOne({ name });

    if (!userName) {
      return next(new Error("User name is not exist"));
    }
    if (!Encoder.compare(password, userName.password)) {
      return next(new Error("Password is incorrect"));
    }

    let successUser = userName.toObject();
    delete successUser.password;

    await setCacheUser(userName._id.toString(), successUser);

    let token = JWTHandler.make({ id: userName._id.toString() });
    Msg(res, "Login successfull", { token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get me
const getMe = async (req, res, next) => {
  try {
    let user = await getCacheUser(req.userId);

    if (!user) {
      user = await userDB.findById(req.userId).select("-password");
    }

    Msg(res, "Get me successfull", user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const dlt = await userDB.deleteOne({ _id: userId }).then((result) => {
      if (result.deletedCount > 0) {
        res.json({ con: true, msg: "Delete user successfully" });
      } else {
        res.json({ con: false, msg: "Failed delete" });
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { register, getAll, deleteUser, login, getMe };
