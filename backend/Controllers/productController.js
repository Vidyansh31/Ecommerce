const Product = require('../models/productModel');

// Creating a Product  -- Admin
exports.createProduct = async (req,res,next) => {

    const product = await Product.create(req.body);

    res.status(201).json({ 
        success: true,
        product
    })
}

// Getting all Products
exports.getAllProducts = async(req,res) => {
    
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}

// Update a Product -- Admin
exports.updateProduct = async (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(501).json({
            success: false,
            message: 'Product not found'
        })
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
}

//Delete a Product  -- Admin
exports.deleteProduct = async (req,res,next) =>{
    
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(501).json({
            success:false,
            message: 'Product not found'
        })
    }

    await Product.remove();

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
}

// Get Product Detail
exports.getDetail = async (req, res, next) =>{

    let product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(501).json({
            success:false,
            message: 'Product not found'
        })
    }

    res.status(200).json({
        success: true,
        product
    })
}