// Import express
const express = require('express');

// Create a "router" object (mini Express app)
const router = express.Router();

// Import the Product model (capital 'P' to follow naming convention)
const Product = require('../models/product_models');

// CREATE A NEW PRODUCT

// When someone sends a POST request to "/"
// Example: POST http://127.0.0.1:5000/product_app/products
router.post('/', async (req, res) => {
    try {
        // req.body contains the data sent from the frontend (e.g., name, price)
        const product = new Product(req.body);

        // Save the product to MongoDB
        const savedProduct = await product.save();

        // Send back the saved product with a 201 Created status
        res.status(201).json(savedProduct);
    } catch (err) {
        // If something goes wrong, send an error response
        res.status(400).json({ message: err.message });
    }
});

// GET route to retrieve all products
router.get('/', async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await Product.find();

        // If no products are found, respond with an empty array
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Respond with the list of products
        res.status(200).json(products);
    } catch (error) {
        // Respond with a 500 error if something goes wrong with the database query
        res.status(500).json({ message: error.message });
    }
});

// UPDATE an existing product by ID
router.put('/:id', async (req, res) => {
    try {
        // Get the ID from the URL and data from the request body
        const { id } = req.params;

        // Find the product by ID and update it with the new data
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,           // return the updated product
            runValidators: true  // ensure data is validated
        });

        // If product not found, respond with 404
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Send back the updated product
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
