const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getDetail } = require('../Controllers/productController');

const router = express.Router();

//Creating first route to get all the products
router.route('/product').get(getAllProducts);

//Creating route to add new product
router.route('/product/new').post(createProduct);

// Creating a route to update a product
router.route('/product/:id').put(updateProduct);

//Deleting a Product  
router.route('/product/:id').delete(deleteProduct);

// Get Product Details 
router.route('/product/:id').get(getDetail);

module.exports = router;