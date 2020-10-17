const mongoose =require("mongoose");


var productschema = mongoose.Schema({
    name : String,
    per : String,
    description: String,
    category : String,
});

  module.exports = mongoose.model("Product",productschema);