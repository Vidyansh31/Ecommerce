const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getDetail } = require('../Controllers/productController');
const{ isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');

const router = express.Router();

//Creating first route to get all the products
router.route('/product').get(isAuthenticatedUser, getAllProducts);

//Creating route to add new product
router.route('/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

// Creating a route to update a product
router.route('/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

//Deleting a Product  
router.route('/product/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

// Get Product Details 
router.route('/product/:id').get(getDetail);

module.exports = router;