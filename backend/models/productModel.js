const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter product name"],
        trim: true
    },
    description:{
        type: String,
        required:[true,"Please enter product description"]
    },
    price:{
        type: Number,
        required:[true,"Please enter product price"]
    },
    rating:{
        type: Number,
        default:0
    },
    images:{
        public_id:{
            type: String,
            required:true
        },
        url:{
            type: String,
            required:true
        }
        
    },
    category:{
        type: String,
        required:[true,"Please enter product category"]
    },
    Stock:{
        type: Number,
        required:[true,"Please enter product Stock"],
        default:1,
        maxlength:4
    },
    numofReviews:{
        type: Number,
        default:0
    },
    review:[
        {
            name:{
                type: String,
                required:true
            },
            rating:{
                type: Number,
                required:true
            },
            comment:{
                type: String,
                
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Product",productSchema);