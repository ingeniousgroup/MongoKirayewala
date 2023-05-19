import { validationResult } from "express-validator"
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Property } from "../model/property.modal.js";
import { WishList } from "../model/wishList.modal.js";
import { HouseRequest } from "../model/houseRequest.modal.js";
import nodemailer from "nodemailer";
import { Engagement } from "../model/engagement.js";
import { request } from "express";


export const signIn = async (request,response,next)=>{
  try{
    const errors = validationResult(request);
    if(!errors.isEmpty())
     return response.status(400).json({error: "Bad request", status: false, errors: errors.array()});
    let user = await User.findOne({email: request.body.email});
    let status = user ? await bcrypt.compare(request.body.password,user.password): false;
    if(status){
      let payload = {subject:request.body.email};
      let userToken = jwt.sign(payload,'afkkkdnkk');
    }
    return status ? response.status(200).json({ message: 'Signin Success', status: true, user: {...user.toObject(),password: undefined}}) : response.status(401).json({message: 'Unauthorized user', status: false});
  }
  catch(err){
    console.log(err);
    return response.status(500).json({error:"Internal Server Error", status: false});
  }
}

export const signUp = async (request,response,next)=>{
  try{ 
   const errors = validationResult(request);
   if(!errors.isEmpty())
     return response.status(400).json({error: "Bad request", status: false, errors: errors.array()});
   let exist = await User.findOne({contact:request.body.contact});  
   if(exist)
     return response.status(400).json({error: "Account already exist", status: false, errors: errors.array()});
   const saltKey = await bcrypt.genSalt(10); 
   request.body.password = await bcrypt.hash(request.body.password,saltKey);
   
   let user = await User.create(request.body);
   return response.status(200).json({message: "Signup success", user: user, status: true});
  }
  catch(err){
    return response.status(500).json({error: "Internal Server Error", status: false});
  }
}

export const viewProperty = async (request,response,next)=>{
  try {
    let property = await Property.find({userId:request.body.userId});
     return response.status(200).json({message:"Property Found",status:true,property})
  } catch (err) {
    console.log(err);
     return response.status(500).json({message:"Internal Server Error",status:false})
  }
}

export const viewProfile = async (request,response,next)=>{
  try {
    let user = await User.findById(request.body.id);
     return response.status(200).json({message:"User Found",status:true,user})
  } catch (err) {
     console.log(err);
     return response.status(500).json({message:"Internal Server Error",status:false})
  }
}

export const updateProfile = async (request,response,next)=>{
  try{
   const errors = validationResult(request);
   if(!errors.isEmpty())
     return response.status(400).json({error: "Bad request", status: false, errors: errors.array()});
    let user = await User.findOneAndUpdate({_id:request.body.id},{name:request.body.name,email:request.body.email,contact:request.body.contact},{new:true})
    return user ? response.status(200).json({message: 'Update Successfull', status: true,user}) : response.status(401).json({message: 'Unauthorized user', status: false});
  }catch (err) {
    console.log(err);
    return response.status(500).json({message:"Internal Server Error",status:false})
  }
}

export const changePassword = async (request,response,next)=>{
  try {
    let user = await User.findOne({_id: request.body.id});
    let status = user ? await bcrypt.compare(request.body.password,user.password): false;
    if(!status)
      return response.status(401).json({message:"Enter Valid Password",status:false});
    else{
      let usera=await User.updateOne({email:user.email},{password:await bcrypt.hash(request.body.newPassword, await bcrypt.genSalt(10))});
      console.log(usera);
       return  response.status(200).json({message:"Password Change Successfully",status:true});
    }
  } catch (err) {
    console.log(err);
    return response.status(500).json({message:"Internal server error",status:fasle});
  }
}

export const view_house_description = async (request,response,next)=>{
  

}

export const addToWishList = async (request,response,next)=>{
    try{ 
     let wishList =  await WishList.findOne({userId: request.body.userId});
     if(wishList){
      console.log(wishList.wishListItems);
        if(wishList.wishListItems.some((item)=>item.propertyId == request.body.propertyId))
          return response.status(200).json({message: "Already added in WishList", status: false});
        wishList.wishListItems.push({propertyId: request.body.propertyId});
        let saved = await wishList.save();
        return response.status(200).json({message: " House added in Wishlist", status: true ,propertyList:saved});
     }
     else{
       let saved = await WishList.create({
           userId: request.body.userId,
           wishListItems:[{propertyId: request.body.propertyId}]
       });
       return response.status(200).json({ propertyList:saved,message: "House added successfully", saved, status: true});
     }
    }
    catch(err){
      console.log(err); 
      return response.status(500).json({error: "Internal Server Error", status: false});
    } 
}

export const viewWistlist = async(request,response,next)=>{
    WishList.find({userId: request.body.userId})
    .populate("wishListItems.propertyId").then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error: "Internal server error"});
    })
}

export const removeFromWishList = async (request,response,next)=>{
   try {
    let wishList =  await WishList.findOne({userId: request.body.userId});
    if(wishList){
       wishList.wishListItems.splice(wishList.wishListItems.findIndex(item => item._id == request.body.propertyId),1);
       let saved = await wishList.save();
      return response.status(200).json({propertyList:saved, message: "Remove From WishList", status: true});
    }else
      return response.status(401).json({message:"Bad Request Error" , status : false});
   }catch(err){
    console.log(err);
      return response.status(500).json({message : "Internal Server Error",status:false});
   }
}

export const houseRequest = async (request,response,next)=>{
  console.log("in house request.........")
  try{ 
    const errors = validationResult(request);
    if(!errors.isEmpty())
      return response.status(400).json({error: "Bad request", status: false, errors: errors.array()});
   
    let req = await HouseRequest.create(request.body);
    console.log(req);
    return response.status(200).json({message: "Request Send Successfully", req, status: true});
   }
   catch(err){
    console.log(err);
     return response.status(500).json({error: "Internal Server Error", status: false});
   }
}

export const forgotPassword = async (request ,response , next) =>{
  try{
    let user = await User.findOne({contact: request.body.contact});
    if (user) {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var passwordLength = 8;
        var password = "";
        for (var i = 0; i <= passwordLength; i++) {
          var randomNumber = Math.floor(Math.random() * chars.length);
          password += chars.substring(randomNumber, randomNumber +1);
         }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'rajputmohit2134@gmail.com',
            pass: 'drxyrqbrxikerqfn'
            }
        }); 
        const saltKey = await bcrypt.genSalt(10); 
        htmlPass = password;
        password = await bcrypt.hash(password,saltKey);
     
       let u = await User.updateOne({contact:request.body.contact},{password}); 
       if(u){
        var mailOptions = {
            from: 'rajputmohit2134@gmail.com',
            to: user.email,
            subject: 'User verification From Kirayewala',
            html: '<p> Kiraye Wala ..!<br/>This is your Temprory password<br/>'+htmlPass+'</p>'
        };
      
        transporter.sendMail(mailOptions, function(error, info){
            if (error)
            console.log(error);
            else 
            console.log('Email sent: ' + info.response);
            
        });
            return response.status(200).json({message:"Password set Successfully"});
      }

    }
    return response.status(401).json({message:"User not exist",status:false});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({err:"internal server error",status:false});
    }

}

export const searching = (request,response,next)=>{
  console.log(request.body);
  var regex = new RegExp(request.body.address,'i');
  Property.find({address:regex}).then(result=>{
    console.log(result)
    return response.status(200).json({message:"Data Found", property:result, status:true})
  }).catch(err=>{
    console.log(err);
  });
}

export const visitCount = async(request,response,next)=>{
  try {
   let pro = await Engagement.findOne({propertyId:request.body.propertyId});
     if(pro){
       if(pro.visitedUser.find((user)=>user.userId==request.body.userId))
         return response.status(200).json({message:"user already visited",status: true});

      pro.houseVisitCount++;
      pro.visitedUser.push({userId:request.body.userId});
      await pro.save();
      return response.status(200).json({message:"Count ++",status:true,pro});
   }else{
      await Engagement.create({     
        propertyId : request.body.propertyId,
        visitedUser:[{userId : request.body.userId}],
        houseVisitCount : 1
     });
    return response.status(200).json({message:"Count ++",status:true});
   }
  } catch (err) {
    console.log(err);
    return response.status(500).json({message:"Internal Server Error", status:false});
  }
}

export const viewPropertyList = async (request,response,next)=>{
  try {
    let property = await Property.find();   
     return response.status(200).json({message:"Property Found",status:true,property})
  } catch (err) {
    console.log(err);
     return response.status(500).json({message:"Internal Server Error",status:false})
  }
}

export const sendOtp = async(request,response,next)=>{
  try{
    console.log(request.body)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'rajputmohit2134@gmail.com',
            pass: 'drxyrqbrxikerqfn'
            }
        }); 

        var mailOptions = {
            from: 'rajputmohit2134@gmail.com',
            to: request.body.email,
            subject: 'Sending Email using Node.js',
            html: '<p> Kiraye Wala ..!<br/>'+request.body.otp+'</p>'
        };
      
         transporter.sendMail(mailOptions, function(error, info){
            if (error)
            console.log(error);
            else 
            console.log('Email sent: ' + info.response);
        });
    
    return response.status(200).json({message:"Otp Send successfully",status:true});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({err:"internal server error",status:false});
    }
}

export const requestList = async(request,response,next)=>{
   try {
    let list = await HouseRequest.find({userId:request.body.userId});
    return response.status(200).json({message:"List Found Succecfully",list,status:true});
   } catch (err) {
    console.log(err);
    return response.status(500).json({err:"internal server error",status:false});
   }
}

export const requestPropertyList = (request,response,next)=>{
  HouseRequest.find({userId: request.body.userId})
  .populate("houseRequest.propertyId").then(result=>{
      return response.status(200).json(result);
  }).catch(err=>{
      console.log(err);
      return response.status(500).json({error: "Internal server error"});
  })
}

export const searchingWithCategory = (request,response,next)=>{
  console.log(request.body);
  var regex = new RegExp(request.body.address,'i');
  Property.find({address:regex,houseCategory:request.body.category}).then(result=>{
    console.log(result)
    return response.status(200).json({message:"Data Found", property:result, status:true})
  }).catch(err=>{
    console.log(err);
  });
}