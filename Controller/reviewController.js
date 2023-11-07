
const adminRoute = require('../Router/adminRouter')
const Admin = require('../model/adminModel');
const  Category = require('../model/categoryModel')
const Product = require('../model/productModel')
const Review = require('../model/Reviewmodel')
const session = require('express-session')
const bcrypt = require('bcrypt')
const sharp = require('sharp')


const fs = require('fs');
const path = require('path');



//review add review
exports.addReview = async(req,res)=>{
    try {
        console.log("add review page");
        const user = req.session.userId;
        const rating = req.body.rating;
        const review = req.body.review;
        const productId = req.body.product_id; // Use req.query to get the 'id' parameter from the URL
        console.log(productId);
      
    } catch (error) {
      console.log(error.message);
    }
  }