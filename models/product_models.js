//import mongoose
const mongoose = require('mongoose');

//define how our product looks like
const productSchema = new mongoose.Schema({
    name:String,            //name of the product
    price:Number,           //price of the product
});

//create a prooduct model based on the schema
const Product = mongoose.model('product', productSchema);
//export the model so wee can use it else where
module.exports = Product;