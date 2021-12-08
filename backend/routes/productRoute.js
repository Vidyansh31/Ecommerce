const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getDetail, createProductReview,getProductReviews,deleteReview} = require('../Controllers/productController');
const{ isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');

const router = express.Router();

//Creating first route to get all the products
router.route('/product').get(isAuthenticatedUser, getAllProducts);

//Creating route to add new product
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

// Creating a route to update a product
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

//Deleting a Product  
router.route("/admin/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

// Get Product Details 
router.route('/product/:id').get(getDetail);

//Create and Update Product review 
router.route("/review").put(isAuthenticatedUser, createProductReview);

//Get all reviews of a product and delete a review
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;