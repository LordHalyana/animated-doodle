const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchemea = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  image: String,
});

const Product = mongoose.model("Campground", CampgroundSchemea);

module.exports = Product;
