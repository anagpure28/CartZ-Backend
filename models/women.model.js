const mongoose = require("mongoose");

const womenSchema = mongoose.Schema({
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

const WomenModel = mongoose.model("Women",womenSchema);

module.exports = {
    WomenModel
}