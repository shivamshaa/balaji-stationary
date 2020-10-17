const mongoose =require("mongoose");


var comapnyschema = mongoose.Schema({
    firstName : String,
    date : String,
    lastName : String,
    email : String,
    phone : String,
    designation : String,
    companyName : String,
    companyAddress : String,
    order : [
        {
            name : String,
            qty : Number,
            per : String
        },
    ]
});

module.exports = mongoose.model("Company",companyschema);