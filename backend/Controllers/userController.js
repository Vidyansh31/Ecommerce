const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//Register user 
exports.registerUser = catchAsyncError( async (req,res,next) => {

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"samplePublicId",
            url:"sampleUrl"
        }
    });

    // Fuction for making jwt token 
    sendToken(user,201,res);
})

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    sendToken(user,200,res);
  });

  //Logout
  exports.logout = catchAsyncError( async (req,res,next)=>{

    res.cookie("token",null,{
      expires: new Date(Date.now()),
      httpOnly: true
    })

    res.status(200).json({
      success: true,
      message:"Logout successfully"
    })
  })

  // Forget password 
  exports.forgotPassword = catchAsyncError( async (req, res, next)=>{

    //Finding user
    const user = await User.findOne({email: req.body.email});
 
    if(!user){
      return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token

    const resetToken = user.generatePasswordResetToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

    try{

      await sendEmail({
        email:user.email,
        subject: `Ecommerce Password Reset`,
        message,
      })

      res.status(200).json({success:true, message:`Email sent to ${user.email} successfully`});

    }
    catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save({validateBeforeSave: false});

      return next(new ErrorHandler(error.message,500));
    }


  })

  //Reset password
  exports.resetPassword = catchAsyncError( async (req, res, next) => {
    //catching token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.body).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: {$gt:Date.now()}
    })

    if(!user){
      return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
    }

    //If password and confirm password does not matched
    if(req.body.password === req.body.confirm.password){
      return next(new ErrorHandler("Password does not match",400));
    }

    //changing password
    user.password = req.body.password;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpires = undefined;

     await user.save();

     sendToken(user,200,res);


  })













