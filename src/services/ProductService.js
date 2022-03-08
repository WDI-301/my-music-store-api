const { ProductModel } = require("../models/ProductModel");
const PermissionService = require("./PermissionService");

const uploadProduct =  async (req, res) => {
  // Now Were checking permission
  PermissionService.verifyAdminPermission(req);
      
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
};

const getProducts =  async (req, res) => {
  // fetch all the products.
  const foundProducts = await ProductModel.find({});

  res.send(foundProducts);
};

const ProductService = {
  uploadProduct,
  getProducts,
};

module.exports = ProductService;