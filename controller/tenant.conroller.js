import { validationResult } from "express-validator"
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Property } from "../model/property.modal.js";
import { WishList } from "../model/wishList.modal.js";

console.log("inside the tenant Controller... ");

export const signIn = async (request,response,next)=>{
  try{
    let user = await User.findOne({email: request.body.email});

    let status = user ? await bcrypt.compare(request.body.password,user.password): false;
    if(status){
      let payload = {subject:request.body.email};
      let token = jwt.sign(payload,'afkkkdnkk');
    }
    return status ? response.status(200).json({message: 'Signin Success', status: true,token, user: {...user.toObject(),password: undefined}}) :
             response.status(401).json({message: 'Unauthorized user', status: false});
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
   const saltKey = await bcrypt.genSalt(10); 
   request.body.password = await bcrypt.hash(request.body.password,saltKey);
   
   let user = await User.create(request.body);
   return response.status(200).json({message: "Signup success", user: user, status: true});
  }
  catch(err){
    return response.status(500).json({error: "Internal Server Error", status: false});
  }
}

export const view_property = async (request,response,next)=>{
  try {
    let property = await Property.find({userId:request.body.userId});
     return response.status(200).json({message:"Property Found",status:true,property})
  } catch (err) {
    console.log(err);
     return response.status(500).json({message:"Internal Server Error",status:false})
  }
}
export const view_profile = async (request,response,next)=>{
  try {
    let user = await User.findById(request.body.id);
    console.log(user);
     return response.status(200).json({message:"User Found",status:true,user})
  } catch (err) {
    console.log(err);
     return response.status(500).json({message:"Internal Server Error",status:false})
  }
}

export const update_profile = async (request,response,next)=>{
  try{
    let user = await User.findOneAndUpdate({_id:request.body.id},{email:request.body.email,contact:request.body.contact,password:request.body.password},{new:true})
    return user ? response.status(200).json({message: 'Update Successfull', status: true,user}) : response.status(401).json({message: 'Unauthorized user', status: false});
  }catch (err) {
    console.log(err);
    return response.status(500).json({message:"Internal Server Error",status:false})
  }
}

export const change_password = async (request,response,next)=>{
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
export const add_to_wishList = async (request,response,next)=>{
    try{ 
     let wishList =  await WishList.findOne({userId: request.body.userId});
     if(wishList){
        if(wishList.wishListItem.some((item)=>item.propertyId == request.body.propertyId))
          return response.status(200).json({message: "Already added in WishList", status: true});
        cart.cartItems.push({productId: request.body.productId});
        let saved = await cart.save();
        return response.status(200).json({message: " House added in Wishlist", status: true});
     }
     else{
       let saved = await WishList.create({
           userId: request.body.userId,
           wishListItems:[{productId: request.body.productId}]
       });
       return response.status(200).json({message: "House added successfully", status: true});
     }
    }
    catch(err){
      console.log(err); 
      return response.status(500).json({error: "Internal Server Error", status: false});
    } 
}
export const remove_from_wishList = async (request,response,next)=>{}
export const house_request = async (request,response,next)=>{}
export const nearBy_house = async (request,response,next)=>{}





