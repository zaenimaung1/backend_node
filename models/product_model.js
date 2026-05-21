const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  user : { type: Schema.Types.ObjectId, ref: "Users", required: true },
  size: { type: String, enum: ["Small", "Medium", "Large"], default: "Medium" },
  colors: { type: [String] },
  tags : { type: [String] },
  discount: { type: Number, default: 0 },
  images: [
    {
      link: { type: String, required: true },
      alt: { type: String },
      desc: { type: String, required: true },
    },
  ],
  shipping: [
    {
      name: { type: String, required: true },
      cost: { type: Number, default: 0 },
      desc: { type: String, required: true },
    },
  ],
  created: { type: Date, default: Date.now },
});

productSchema.index({tags : 1 , user : 1}); // mongo slow training
const Product = mongoose.model("Products", productSchema);

module.exports = Product;
