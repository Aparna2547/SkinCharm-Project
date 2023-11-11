
const adminRoute = require('../Router/adminRouter')
const Admin = require('../model/adminModel');
const  Category = require('../model/categoryModel')
const Product = require('../model/productModel')
const session = require('express-session')
const bcrypt = require('bcrypt')
const sharp = require('sharp')

const fs = require('fs');
const path = require('path');



//allproduct  page rendering
exports.allProduct = async (req,res,next)=>{
    try {

      // //for warning message
    var context = req.app.locals.specialContext;
    req.app.locals.specialContext = null;
     //search in the home
    

    var search =""
    if(req.query.search){
     search = req.query.search || ''
    }
    console.log(search);  



    var page = 1;
    if(req.query.page){
      page = req.query.page;
    }

    const limit = 3

     const Data = await Product.find({
       productname:{ $regex: '^' + search , $options: 'i'}
    }).limit(limit*1).skip((page-1)*limit).populate('category')
    // console.log(Data);

    const productCount = await Product.find({
      productname: { $regex: '^' + search,$options:'i'}
    }).countDocuments()
    if(Data){
      // console.log(userData);
        res.render('admin/product',{
          Data,
          totalPages : Math.ceil(productCount/limit),
          currentPage:page,
          search
        });
      }
      else{
        req.app.locals.specialContext = "user not found"
        res.render('admin/product', { Data, context });
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  

  

//load add product page GET
exports.loadAddProduct=async function(req ,res,next){
    try {
  
      const category = await Category.find({isListed:true})
      // console.log(category);
  
      res.render('admin/addProduct',{category})
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  
  
 
//add product -POST
exports.addProduct = async(req,res)=>{
    // console.log(req.body);
    try {
      const image = req.files


      const imageFolder = 'images'; // Folder where your original images are stored

// Read the list of image filenames from the 'images' folder
fs.readdir(imageFolder, async (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    // const inputPath = path.join(imageFolder, filename);

    try {
      // Crop and resize the image
      await sharp("/images/")
        .resize(480, 480)
        .toFile("/images/"); // Overwrite the original image
      console.log(`Cropped and saved: ${"/images/"}`);
    } catch (error) {
      console.error(`Error cropping ${filename}: ${error}`);
    }
  }
});

      //  console.log("image:+"+ image[0].filename);
      //  const cropImgs= [
      //   image[0].filename,
      //   image[1].filename,
      //   image[2].filename
      //  ]
      //  console.log(cropImgs);

       // image cropping
      // for (let i = 0; i < cropImgs.length; i++) {
      //   await sharp("/images/" + cropImgs[i])
      //     .resize(480, 480)
      //     .toFile("/crop/" + cropImgs[i]);
      // }

      const {productname,category,brand,actualPrice,sellingPrice,stock,description} =req.body;
      // console.log("results  " + productname,category,brand,actualrice,stock,description);

    
        //saving data
        const newProduct = new Product({
          image,
          productname,
          category,
          brand,
          actualPrice,
          sellingPrice,
          stock, 
          description,
          addedDate:new Date()
        })
        console.log("data entered to product model..");
        await newProduct.save()
        req.app.locals.specialContext = "New product is added.."
        res.redirect('/admin/product')
    } catch (error) {
      console.log(error);
    }
  }
  
   //loading edit product
exports.loadProduct = async (req,res,next)=>{
    try {
      const id = req.query._id;
      // console.log("edit-"+id)
      const editData = await Product.findOne({_id:id}).populate('category')
      const category = await Category.find({isListed:true})
      // console.log(editData.category);
      if(editData){
        res.render('admin/editProduct',{prdt:editData,category,pdtCat:editData.category.category,pdtBrand:editData.brand})
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  
//   //edit Product
exports.editProduct = async (req,res)=>{
  try {
    console.log("errrr");
    const id = req.body.id;
    console.log("id for edit product "+id);
    const {productname,categoryname,brandname,actualprice,sellingprice,stocks,Description}=req.body;
    const image = req.files
   console.log(image);

  const updateData = {
    $set: {
      productname: productname,
      category: categoryname, // You can use the actual ID here
      brand: brandname,
      actualPrice: actualprice,
      sellingPrice: sellingprice,
      stock: stocks,
      description: Description,
    },
    $push: {
      image : { $each: image }
    }
  };
const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
// console.log("updated successfully "+updatedProduct);
        res.redirect('/admin/product')


  } catch (error) {
    console.log(error);
  }
}


  //delete image
  exports.deleteProductImg = async (req,res)=>{
    try {
      const id = req.query.id;
      console.log(id);
      const filename = req.query.filename;
      console.log(filename);
      await Product.findByIdAndUpdate({_id:id},{$pull:{image:{filename}}})
      res.redirect(`/admin/editProduct?_id=${id}`)

    } catch (error) {
      console.log(error);

    }
  }



  //list product -GET
exports.listProduct =async (req,res,next)=>{
    try {
      const id = req.query._id;
      console.log(id);
      const prdtData = await Product.findOne({_id:id})
      if(prdtData.isListed ==true){
        await Product.updateOne({_id:id},{$set:{isListed:false}})
      }    
      else{
        await Product.updateOne({_id:id},{$set:{isListed:true}})
      }
      console.log("Product list changed");
      res.redirect('/admin/product')
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  