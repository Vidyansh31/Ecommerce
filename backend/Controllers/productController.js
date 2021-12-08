const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/ApiFeatures');

// Creating a Product  -- Admin
exports.createProduct = catchAsyncError( async (req,res,next) => {
    
    //Kaunse user ne product banaya hai pata lagega
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({ 
        success: true,
        product
    })
})

// Getting all Products
exports.getAllProducts = catchAsyncError( async(req,res) => {

    const resultperPage = 5;
    const ProductCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultperPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products
    })
})

// Update a Product -- Admin
exports.updateProduct = catchAsyncError( async (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

//Delete a Product  -- Admin
exports.deleteProduct =catchAsyncError( async (req,res,next) =>{
    
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

    await Product.remove();

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
})

// Get Product Detail
exports.getDetail = catchAsyncError( async (req, res, next) =>{

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

    res.status(200).json({
        success: true,
        product,
        ProductCount
    })
})