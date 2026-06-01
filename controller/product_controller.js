const productDB = require("../models/product_model")

const getById = async (req, res, next) => {
    try {
        const product = await productDB.findById(req.params.id).populate('user category');

        if (!product) {
            return res.json({
                con: false,
                msg: "Product not found",
            });
        }

        res.json({
            con: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
}

//formData => req.body
const add = async (req , res , next) => {
    try {
        req.body.user = req.userId;
        req.body.images = req.imgLinks || [];
        req.body.colors = JSON.parse(req.body.colors);
        req.body.tags = JSON.parse(req.body.tags);
        req.body.shipping = JSON.parse(req.body.shipping);

        let product = await new productDB(req.body).save();

        res.json({
            con: true,
            Msg: "Product added successfully",
            data : product});
    } catch (err) {
        next(err);
    }
}

//JsonData
const add2 = async (req , res , next) => {
    try {
        req.body.user = req.userId;
        let product = await new productDB(req.body).save();

        res.json({
            con: true,
            Msg: "Product added successfully",
            data : product});
    } catch (err) {
        next(err);
    }
}

//pagination

const paginate = async (req , res , next) => {
    let pageIndex = Number(req.params.index);
    let productCount = 3;
    let products = await productDB.find().skip(productCount * pageIndex).limit(productCount);
    res.json({
        con: true,
        data: products
    });

}

//update
const modify = async (req , res , next) => {
        let product = await productDB.findById(req.params.id);
        if(!product){
            return res.json({
                con: false,
                msg: "Product not found"
            });
        }
        else{
            updateProduct = await productDB.findByIdAndUpdate(product._id,req.body,{new : true});
             res.json({
            con: true,
            msg: "Product updated successfully",
            data : updateProduct
        });
        }
       
    
}

//delete
const drop = async (req , res , next) => {
    let product = await productDB.findById(req.params.id);
    if(!product){
        return res.json({
            con: false,
            msg: "Product not found"
        });
    }
    else{
        await productDB.findByIdAndDelete(product._id);
         res.json({
        con: true,
        msg: "Product deleted successfully",
    });
    }
   
}
module.exports = {
    add,getById,add2,paginate,modify,drop
}
