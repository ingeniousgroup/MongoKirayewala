import { request, response } from "express";
import { User } from "../model/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { Property } from "../model/property.modal.js";
import { HouseRequest } from "../model/houseRequest.modal.js";


export const signIn = async (request, response, next) => {
    try{
        let user = await User.findOne({email: request.body.email});
        let status = user ? await bcrypt.compare(request.body.password,user.password): false;
        return status ? response.status(200).json({message: 'Signin Success', status: true, user: {...user.toObject(),password: undefined}}) :
             response.status(401).json({message: 'Unauthorized user', status: false});
}
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const signUp = async (request, response, next) => {
    try{ 
        const errors = validationResult(request);
        if(!errors.isEmpty())
          return response.status(400).json({error : "Bad request", status: false, errors: errors.array()});
        const saltKey = await bcrypt.genSalt(10); 
        request.body.password = await bcrypt.hash(request.body.password,saltKey);
        
        let user = await User.create(request.body);
        return response.status(200).json({message: "Signup success", user: user, status: true});
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const viewProperty = async (request, response, next) => {
    try {

        let property = await Property.find({userId : request.body.userId})
       
        if (property)
            return response.status(200).json({ massage: "property shown success", status: true });
        else
            return response.status(400).json({ massage: "signin failed", status: false });
    }
    catch (err) {
        console.log(err);
        
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const updateName = async (request, response, next) => {
    try {
        let result = await User.updateOne(
            {
                _id : request.body.userid
            },
            {
                name:request.body.name
            }
        );
        return response.status(200).json({ message: "name Updated", result, status: true });

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });
    }
}


export const updateProperty = async (request, response, next) => {
    try {
        let result = await Property.updateOne(
            {
                userId : request.body.userId
                
            },
            {
                description:request.body.description,
                rent:request.body.rent,

                imagesUrlArray:request.body.imagesUrlArray

            }
        );
        return response.status(200).json({ message: "property updated", result, status: true });

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}

export const owner_change_password = async (request, response, next) => {
    try {
        let result = await User.updateOne(
            {
                password : request.body.password,
                _id:request.body.userid
            },
            {
                password : request.body.newPassword
            }
        );
        return response.status(200).json({ message: "owner password update", result, status: true });

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}

export const owner_view_profile = async (request, response, next) => {
    try {
        let result = await User.findOne(
            {
                userid: request.body.userid
            }
        );
        if(result)
           return response.status(200).json({ message: "owner profile is", result, status: true });

           return response.status(202).json({message:"something went wrong" ,status:false});

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}


export const viewEnquiry = async (request,response,next)=>{
    try {
        let result = await HouseRequest.find();
        if(result)
           return response.status(200).json({ message: "owner profile is", result, status: true});


           return response.status(202).json({message:"something went wrong" ,status:false});

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }   

}

export const addProperty = async (request,response,next) => {
    try {
        let addproperty = await Property.create(request.body);
        if(addproperty)
         return response.status(200).json({message:"property saved ",status:true});

         return response.status(400).json({message:"something went wrong ",status:false});
    } catch (err) {
        console.log(err);
        return response.status(500).json({message:"Internal server Error",status:false});
    }
}


