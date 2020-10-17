const mongoose=require("mongoose");
const Product = require("./Product");

mongoose.connect("mongodb+srv://admin-amit:amitbhattacharjee@balaji-stationers.gywpu.mongodb.net/Balaji-stationers?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false});


const product = new Product({
    name : "Paper",
    per : "r",
    description: "this is paper",
    category : "stationary",
})

const products=[
    new Product({
        name : "PENCIL",
        per : "r",
        description: "this is pencil",
        category : "stationary",
    }),
    new Product({
        name : "eraser",
        per : "r",
        description: "this is eraser",
        category : "stationary",
    }),
    new Product({
        name : "eraser",
        per : "r",
        description: "this is eraser",
        category : "stationary",
    })
];

for(var i=0;i<products.length;i++){
    products[i].save();
}

// product.save();