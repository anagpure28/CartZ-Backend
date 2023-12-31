// routes/product.js
const express = require('express');
const menRouter = express.Router();
const {MenModel} = require('../models/men.model');

//Welcome text
menRouter.get("/",(req,res)=>{
    res.send("Welcome to men section...")
})

// Create a product
menRouter.post('/products', async (req, res) => {
  try {
    const product = new MenModel(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
menRouter.get('/products', async (req, res) => {
  try {
    const products = await MenModel.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single product by ID
menRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await MenModel.findById(req.params.id);
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
menRouter.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await MenModel.findByIdAndUpdate(
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
menRouter.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await MenModel.findByIdAndRemove(req.params.id);
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
menRouter.get('/products/sort/price', async (req, res) => {
  try {
    const sortedProducts = await MenModel.find().sort({ price: 1 });
    res.json(sortedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { menRouter };
