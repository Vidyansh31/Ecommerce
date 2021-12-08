//For User authentication
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = catchAsyncError( async (req,res,next) => {
    const {token} = req.cookies;

    //Not logged in
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }

    const decodeData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);

    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Roles: ${req.user.role} is not allowed to access`,403)); 
        }
        next();
    }
}
