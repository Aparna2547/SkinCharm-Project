const Coupon = require('../model/couponModel')
const User = require('../model/userModel')
const session = require('express-session')
const Cart = require('../model/cartModel')


//coupon page rendering
exports.loadCouponPage = async (req,res) =>{
    try {
          //warning messages
    var context = req.app.locals.specialcontext;
    req.app.locals.specialcontext = null;

    const data = await Coupon.find({showStatus:true})
    console.log(data);
        res.render("admin/coupon",{data})
    } catch (error) {
        console.log(error);
    }
}

//add coupon -post
exports.addCoupon = async (req,res)=>{
    try {
        const {couponName,minimumPurchase,maximumDiscount,expiryDate} = req.body
        console.log(couponName,minimumPurchase,maximumDiscount,expiryDate);

        const newCoupon = new Coupon({
            couponName,
            minimumPurchase:minimumPurchase,
            maximumDiscount: maximumDiscount,
            expiryDate
        })
        await newCoupon.save();
        console.log("data entered");
        req.app.locals.specialcontext = "coupon added";
        res.redirect('/admin/coupons')
    } catch (error) {
        console.log(error);
    }
}

//edit coupon
exports.editCouponLoad  = async(req,res)=>{
    try {
        const id = req.query._id;
        console.log(id);
        const data = await Coupon.findOne({_id:id})
        console.log(data);
        res.render('admin/editCoupon',{data})
    } catch (error) {
        console.log(error);
    }
}

//edit coupon -post
exports.editCoupon = async (req,res)=>{
    try {
        const id = req.body.id;
        console.log(id);
        const {couponname,minimumPurchase,maximumDiscount,expiryDate} = req.body;
        console.log(couponname,minimumPurchase,maximumDiscount,expiryDate);
        await Coupon.updateOne({_id:id},{
            $set:{
                couponName: couponname,
                minimumPurchase,
                maximumDiscount,
                expiryDate
            }
        })
        console.log("data changed");
        res.redirect('/admin/coupons')
    } catch (error) {
        console.log(error);
    }
}

//deleteCoupon
exports.deleteCoupon = async (req,res)=>{
    try {
        const id = req.query._id
       const data =  await Coupon.findOne({_id:id})
      if(data.showStatus == true){
        await Coupon.updateOne({_id:id},{$set:{showStatus:false}})
      }else{
        await Coupon.updateOne({_id:id},{$set:{showStatus:true}})
      }

    } catch (error) {
        console.log(error);
    }
}




//USER SIDE


//applu coupon
exports.getCoupon = async (req,res)=>{
    try{
        const user = req.session.userId;
        const cartData = await Cart.findOne({user}).populate('product.product_id');
        console.log(cartData );
        const cart = cartData.product;
        let totalAmount = 0,date= new Date();

        totalAmount +=cartData?.product.reduce((acc,item)=>{
                            const totalItem = item.price * item.count;
                            return acc + totalItem
                        },0)
                        // console.log('totalAmount,',totalAmount);


        //coupon
        const coupon = req.body.coupon;
        const couponFound = await Coupon.findOne({couponName:coupon})
        console.log("coupon",coupon,'coponFound',couponFound);
        
        //checks if the coupon is already used by the user  
        const usedUser = await Coupon.findOne({couponName:coupon,usedUser:{$in:[user]}})
        console.log(usedUser);
        if(usedUser){
            res.json({success:false,message:"Coupon is already used by the user"})
        }
       else if(couponFound?.expiryDate < date){
            res.json({success:false,message:'Coupon Expired'})
        }
        // else if(usedUser){
        //     res.json({message:'User already used the coupon'})
        // }
        else if(couponFound){
            if(totalAmount < couponFound.minimumPurchase){
                res.json({success:false,message:'Less amount to apply'})
            }
            else{
                await Cart.findOneAndUpdate({user},{$set:{isCouponApplied:coupon}})
                totalAmount = totalAmount - couponFound.maximumDiscount
                res.json({success:true,message:'Coupon applied',maxDiscount:couponFound.maximumDiscount,totalAmount})

                // await Coupon.updateOne({couponName:coupon},{$set:{usedUser:user}})
            }
        }
        else{
            res.json({success:false,message:'Invalid coupon'})
        }

    }catch (error) {
      console.error(error);
//         res.status(500).json({ message: "Internal server error" });
    }
};

//remove coupon
exports.removeCoupon = async (req,res)=>{
    try {
        console.log("coupon remove");
        const user = req.session.userId;
        console.log(user);
        await Cart.updateOne({user},{$set:{isCouponApplied:""}})
        res.json({success:true})
       // res.rediect('/cart')
    } catch (error) {
        console.log(error.message);
    }
}