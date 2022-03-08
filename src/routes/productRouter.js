const express = require('express');
const jwt = require('jsonwebtoken');
const { ProductModel } = require('../models/ProductModel');
const { UserModel } = require('../models/UserModel');

const productRouter = express.Router();

// Authentication
  // When we verify the user is who they say the are.
  // Usually when they provide us a user name and password.

// Authorization
  // Verifying that the request is authorized.
  // aka making sure the user making the
  // request is the same user who we authetincated earlier with their user name and password

  

// Store the the products to the database
productRouter.post('/upload-product', async (req, res) => {
  // Authorization process starts
  // see if the user making the request is an admin
    // See who is the user making the request
    const userToken = req.cookies.session_token;

    try {
      const {userId, iat } = jwt.verify(userToken, "secretPassword");
        
        const user = await UserModel.findOne({ id: userId });

        // Authorization ends

        // Now Were checking permission
        if(!user.isAdmin){
          throw new Error('User is not an admin!!')
        }

      } catch(error){
        throw new Error('error finding user');
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