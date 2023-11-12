
const adminRoute = require('../Router/adminRouter')
const Admin = require('../model/adminModel');
const  Category = require('../model/categoryModel')
const Product = require('../model/productModel')
const Review = require('../model/Reviewmodel')
const Order  = require('../model/orderModel')
const session = require('express-session')
const bcrypt = require('bcrypt')
const sharp = require('sharp')


const fs = require('fs');
const path = require('path');



//add review page -GET
exports.addReviewload = async (req,res)=>{
  try {
    const id = req.query.id;
    console.log(id);
    req.session.productId = id;
    const order = await Order.findOne({ "orders._id": id }).populate(
      "orders.product_id"
    );
      console.log(order);
      const reviewFound = await Review
  .findOne({ product_id: id })
  .populate('reviews.user_id');   
console.log('reviews', reviewFound);


    // // const product = order.orders[0].product_id;
    // const orderStatus = order.orders.orderStatus
    // console.log('order of the product:',orderStatus);
    res.render('addreview',{reviewFound})
  } catch (error) {
    console.log(error);
  }
}

//review add review
exports.addReview = async(req,res)=>{
    try {
        const user = req.session.userId;
        const rating = req.body.selectedValue;
        const review = req.body.review;
        const productId = req.session.productId;
        
        const reviewFound = await Review.findOne({ product_id: productId });
        
        if (!reviewFound) {
          const data = new Review({
            product_id: productId,
            reviews: [{
              user_id: user,
              rating: rating,
              review: review,
              date: new Date()
            }]
          });
          await data.save();
        } else {
          await Review.updateOne({ product_id: productId }, {
            $push: {
              reviews: {  // Use $push directly on the reviews array
                user_id: user,
                rating: rating,
                review: review,
                date: new Date()
              }
            }
          });
        }
        
        res.redirect('/orders&returns')
    } catch (error) {
      console.log(error.message);
    }
  }