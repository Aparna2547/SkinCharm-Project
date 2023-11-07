const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    product_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    reviews : [{
        user_id :{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        rating : {
            type:Number
        },
        review: {
            type : String
        },
        date :{
            type: Date
        }
    }]
})

module.exports = mongoose.model("Review",reviewSchema)