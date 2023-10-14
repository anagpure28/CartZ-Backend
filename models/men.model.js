const mongoose = require("mongoose");

const menSchema = mongoose.Schema({
  gender: String,
  id: Number,
  ratingsContainer: String,
  category: String,
  ratingsCount: String,
  separator: String,
  baseHref: String,
  img: String,
  brand: String,
  title: String,
  sizeInventoryPresent: String,
  discountedPrice: Number,
  price: Number,
  discountPercentage: String,
}, {
    versionKey: false
})

const MenModel = mongoose.model("Men",menSchema);

module.exports = {
    MenModel
}