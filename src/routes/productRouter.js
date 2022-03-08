const express = require('express');
const ProductService = require('../services/ProductService');

const productRouter = express.Router();  

// Store the the products to the database
productRouter.post('/upload-product', ProductService.uploadProduct);

productRouter.get('/get-products', ProductService.getProducts)

module.exports = productRouter;