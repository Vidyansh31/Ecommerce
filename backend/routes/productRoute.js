const express = require('express');
const { getAllProducts } = require('../Controllers/productController');

const router = express.Router();

//Creating first route to get all the products
router.route('/product').get(getAllProducts);

module.exports = router;