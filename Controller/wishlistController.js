const User = require('../model/userModel')
const Product = require('../model/productModel')
const Wishlist = require('../model/wishlistModel')
const Cart = require('../model/cartModel')


//rendering the wishlist page
exports.loadWishList = async (req,res)=>{
    try {
        const user = req.session.userId;
    
     
    //getting cart product count - badge
    let cartCount = 0
    if (user) {
      const cart = await Cart.findOne({ user });
      // Assuming you want to calculate cartCount based on the user's cart items
      if (cart) {
        cartCount = cart.product.length;
      }
    }
        const id = req.query.id;
        let productFound
        if(user){
           productFound =await Cart.findOne({user},{product:{$elemMatch:{product_id:id}}})
        }
        console.log("product productFound",productFound);
    
        const Data = await Wishlist.findOne({user}).populate('product.product_id')
        // console.log(Data.product[0].product_id);
        res.render('wishlist',{Data,productFound,cartCount})
    } catch (error) {
        console.log(error);
    }
}

//add to wishlist
exports.addtoWishlist = async (req,res)=>{
    try {
        const user = req.session.userId;
        console.log("userId"+user);
        if(!user){
            return res.redirect('/login')
        }
        const productId = req.query.productId;
       // console.log(productId);

        const product = await Product.findOne({_id:productId})
        //console.log(product);
        
        let userFound = await Wishlist.findOne({user})
        console.log(userFound);
        if(!userFound){
            const newUser = new Wishlist({
                user,
                product:[{
                    product_id:productId
                }]
            })
            await newUser.save();
        }
        else{
            await Wishlist.updateOne({user},{
                $push:{product:{product_id:productId}
         } })
        }
        console.log("saved to wishlist");       
        res.redirect(`/singleProductpage?id=${productId}`)
    } catch (error) {
        console.log(error);
    }
}



//deleteing items from wishlists
exports.wishlistDelete = async (req,res)=>{
    try {
        const id =req.query.productId;
        console.log(id);
        const user = req.session.userId
        const product = await Product.findOne({_id:id})

        //deleteing item from product
        const deleteItem = await Wishlist.findOneAndUpdate({user},{
            $pull:{product:{product_id:id}}
        })
        console.log(deleteItem);
        res.redirect('/wishlist')
    } catch (error) {
        console.log(error);
    }
}



//add to wishlist in shop page
exports.addtoWishlistinShop = async (req,res)=>{
    try {
        const user = req.session.userId;
        if(!user){
            return res.json({success:false})
        }
        const productId  = req.query.productId;
        console.log(productId)
        
        
        //finding user  in the Wishlist otherwiser ads a new wishlist for user
        const userFound = await Wishlist.findOne({user})
        console.log(userFound);
            await Wishlist.updateOne({user},{
                $push:{product:{product_id:productId}}
            },
            {upsert:true})
            return res.json({success:true})
        
       
        
    } catch (error) {
        console.log(error.message);
    }
}

