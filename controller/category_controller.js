const cateDB = require("../models/category_model");
const { Msg } = require("../utils/Core");

const all = async (req, res, next) => {
  const categories = await cateDB.find();
  res.json({
    con: true,
    data: categories,
  });
};
const getById = async (req, res, next) => {
  try {
    const category = await cateDB.findById(req.params.id);

    if (!category) {
      return res.json({
        con: false,
        msg: "Category not found",
      });
    }

    res.json({
      con: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    let cateDb = await cateDB.findOne({
      name: req.body.name,
    });

    if (cateDb) {
      return res.json({
        con: false,
        msg: "Category already exists",
      });
    }

    let saveDb = await new cateDB(req.body).save();

    res.json({
      con: true,
      data: saveDb,
    });
  } catch (error) {
    next(error);
  }
};
const modify = async (req, res, next) => {
  try {
    let cateDb = await cateDB.findById(req.params.id);

    if (!cateDb) {
      next(new Msg("Category not found"));
    } else {
      let updateDb = await cateDB.findByIdAndUpdate(cateDb._id, req.body)
      res.json({
        con: true,
        data: updateDb,
      });
    }
  } catch (error) {
    next(error);
  }
};
const drop = async (req, res, next) => {
    let dltCate = req.params.id;
    if(!dltCate){
        next(new Msg("Category not found"));
    }else{
        let dltDb = await cateDB.findByIdAndDelete(dltCate);
        res.json({
            con: true,
            data: dltDb,
        });
    }
};

module.exports = {
  all,
  getById,
  create,
  modify,
  drop,
};
