const express = require('express');         //framework to build webservers easiily
const mongoose = require('mongoose');               //help connect and talk to mongodb
const cors = require('cors');                   //allows our front end to talk tp the backend
require('dotenv').config();                     //loads seecret values from the .env file



const app = express();

//MIDDLE WARE
app.use(cors());            //allows your frontend (React) to make api calls to this backend 
app.use(express.json());      //makes express aautomatically readd and understand JSON data sent requests
//without this req.body would be undefined

//CONNECT TO MONGODB

//process.env.MONGO_URI comes from your env file
//example inside .env
//MONGO_URI=mongodb://127.0.0.1:27017/product_app//local mongodb
//PORT=5000 


mongoose.connect(process.env.MONGO_URI)
    .then(() =>console.log('connected to mongo db')) //if connection works
    .catch(err => console.log('connection error:', err));  //if it fails

    //ROUTES- where the app listens to specific URLs

    //import the product routes file
    //this is the route we made earlier in the routes/productRoutes.js
const productRoutes = require('./routes/product_routes');

//if someone visits /product_app/products send them to productRoutes
//eg GET http://localhost:5000/product_app/products
app.use('/product_app/products',productRoutes);

//launching the server
app.listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}`);

});
