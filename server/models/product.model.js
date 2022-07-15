const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, "You need a guitar model"],
    unique: true,
    maxlength: 250,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  frets: {
    type: Number,
    required: true,
  },
  woodtype: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "You need a description"],
    maxlength: 10000,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 255,
  },
  available: {
    type: Number,
    required: [true, "How many of this model we own"],
    maxlength: 5000,
    default: 0,
  },
  itemSold: {
    required: true,
    type: Number,
    default: 0,
  },
  shipping: {
    type: Boolean,
    required: [true, "Specify if this product has free shipping"],
    default: false,
  },
  images: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
