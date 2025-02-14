const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    product_price: {
      type: Number,
      required: true,
      trim: true,
    },
    product_description: {
      type: String,
      trim: true,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    product_rating: {
      type: Number,
      default: 0,
      required: true,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
