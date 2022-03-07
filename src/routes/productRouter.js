const express = require('express');
const { ProductModel } = require('../models/ProductModel');

const productRouter = express.Router();

// Store the the products to the database
productRouter.post('/upload-product', async (req, res) => {

  // see if the user making the request is an admin
    // See who is the user making the request
    const user = req.body.user;


    // Once we know who the user is, lets check if he/she is an admin
      // BUT WE DONT KNOW WHO THE USER IS.
      // Just because the request says someone is an user, it doesnt mean they are.

    // if theyre not and admin throw some error telling them they cant hit this route
    if(!user.isAdmin){
      throw new Error('User is not an admin!!')
    }

  // Grab the product data from the request
  const productData = req.body.productData;

  // create new product using the product data
  const newProduct = new ProductModel(productData);
  
  // save the new product to the db
  const savedProduct = await newProduct.save();

  const cleanedSavedProduct = {
    id: savedProduct.id,
    title: savedProduct.title,
    brand: savedProduct.brand,
    price: savedProduct.price,
    description: savedProduct.description,
    image: savedProduct.image,
  };

  res.send(cleanedSavedProduct);
});

productRouter.get('/get-products', async (req, res) => {

  // fetch all the products.

  const foundProducts = await ProductModel.find({});

  res.send(foundProducts);
})

module.exports = productRouter;