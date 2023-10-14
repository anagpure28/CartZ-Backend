// routes/product.js
const express = require('express');
const womenRouter = express.Router();
const {WomenModel} = require('../models/women.model');

//Welcome text
womenRouter.get("/",(req,res)=>{
    res.send("Welcome to women section...")
})

// Create a product
womenRouter.post('/products', async (req, res) => {
  try {
    const product = new WomenModel(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
womenRouter.get('/products', async (req, res) => {
  try {
    const products = await WomenModel.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single product by ID
womenRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await WomenModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product by ID
womenRouter.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await WomenModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product by ID
womenRouter.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await WomenModel.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sort products by price
womenRouter.get('/products/sort/price', async (req, res) => {
  try {
    const sortedProducts = await WomenModel.find().sort({ price: 1 });
    res.json(sortedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { womenRouter };
