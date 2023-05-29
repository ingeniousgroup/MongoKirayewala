import { request, response } from "express";
import { User } from "../model/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { Property } from "../model/property.modal.js";
import { HouseRequest } from "../model/houseRequest.modal.js";
import { Subscription } from "../model/subscription.js";
import today from "../date.js";
import db from "../database/database-connectivity.js"
import { OwnerRequest } from "../model/ownerRequest.modal.js";
import multer from "multer";
import mongoose from "mongoose";
import { Admin } from "../model/admin.modal.js";
const upload = multer({dest:'uploads/'});


export const signIn = async (request, response, next) => {
    try {
        let user = await User.findOne({ email: request.body.email });
        let status = user ? await bcrypt.compare(request.body.password, user.password) : false;
        return status ? response.status(200).json({ message: 'Signin Success', status: true, user: { ...user.toObject(), password: undefined } }) :
            response.status(401).json({ message: 'Unauthorized user', status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const signUp = async (request, response, next) => {
    try {
        console.log(request.body);
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", status: false, errors: errors.array() });
        const saltKey = await bcrypt.genSalt(10);
        request.body.password = await bcrypt.hash(request.body.password, saltKey);

        let user = await User.create(request.body);
        console.log(user);
        return response.status(200).json({ message: "Signup success", user: user, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const viewProperty = async (request, response, next) => {
    try {

        let property = await Property.find({ userId: request.body.userId })

        if (property)
            return response.status(200).json({ massage: "property shown success", status: true, property });
        else
            return response.status(400).json({ massage: "signin failed", status: false });
    }
    catch (err) {
        console.log(err);

        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}



export const updateProperty = async (request, response, next) => {
    try {
        let result = await Property.updateOne(
            {
                userId: request.body.userId

            },
            {
                description: request.body.description,
                rent: request.body.rent,

                imagesUrlArray: request.body.imagesUrlArray

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
                password: request.body.password,
                _id: request.body.userid
            },
            {
                password: request.body.newPassword
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
        if (result)
            return response.status(200).json({ message: "owner profile is", result, status: true });

        return response.status(202).json({ message: "something went wrong", status: false });

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}


export const viewEnquiry = async (request, response, next) => {
    try {
        let result = await HouseRequest.find();
        if (result)
            return response.status(200).json({ message: "owner profile is", result, status: true });


        return response.status(202).json({ message: "something went wrong", status: false });

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }

}

export const addProperty = async (request, response, next) => {
    let imagesUrlArray = [];
    request.files.map((fileObject)=>{
        imagesUrlArray.push(fileObject.filename)
    })
    const {userId,houseCategory,rent,status,balconies,carpetArea,floor,furnshing,noOfBathoom,otherRoom,address,description,locationAddress,latitude,longitue} = request.body;
    try {
        let addproperty = await Property.create({userId:userId,houseCategory:houseCategory,rent:rent,status:status,balconies:balconies,carpetArea:carpetArea,floor:floor,furnshing:furnshing,noOfBathoom:noOfBathoom,otherRoom:otherRoom,address:address,description:description,locationAddress:locationAddress,latitude:latitude,longitude:longitue,imagesUrlArray:imagesUrlArray});
        if (addproperty)
            return response.status(200).json({ message: "property saved ", status: true,addproperty});


        return response.status(400).json({ message: "something went wrong ", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const addPropertyDetails = async (request, response, next) => {
    try {
        let addproperty = db.collection("propertyDetails").insertOne(request.body);
        if (addproperty)
            return response.status(200).json({ message: "property saved ", status: true });

        return response.status(400).json({ message: "something went wrong ", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server Error", status: false });
    }
}

export const subscription = async (request, response, next) => {
    try {
        let takeSubscription = Subscription.create({ userId: request.body.userId, subscriptionPrice: request.body.subscriptionPrice });
        if (takeSubscription)
            return response.status(200).json({ message: "subscription taken ", status: true });
        return response.status(400).json({ message: "something went wrong ", status: false });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "internal server error ", status: false });
    }
}

export const expireSubscription = async (request, response, next) => {
    let subscriptionList = await Subscription.findOne({ userId: request.body.userId });
    if (today > subscriptionList.subscriptionExpiry) {
        let data = await Subscription.findOneAndDelete({ userId: request.body.userId });
    }
}


export const houseRequestFromTenant = async (request, response, next) => {
    try {
        let result = await OwnerRequest.find({ ownerId: request.body.ownerId }).populate({path:'userId'}).populate({path:"propertyId"});
        if (result)
            return response.status(200).json({ message: "success", status: true, result });

        return response.status(200).json({ message: "wrong" });
    } catch (error) {
        console.log(error);
        return response.status(200).json({ message: "internal" });
    }
}

export const houseRequestFromTenantWithoutAdmin = async (request, response, next) => {
    try {
        let result = await HouseRequest.find({ ownerId: request.body.ownerId }).populate({path:'userId'}).populate({path:"propertyId"});
        if (result){
            return response.status(200).json({ message: "success", status: true, result });
        }
            

        return response.status(200).json({ message: "wrong" });
    } catch (error) {
        console.log(error);
        return response.status(200).json({ message: "internal" });
    }
}

export const viewPropertyById = async (request, response, next) => {
    try {

        let result = await Property.find({ _id: request.body.propertyId })

        if (result)
            return response.status(200).json({ massage: "property found by its ID", status: true, result });
        else
            return response.status(400).json({ massage: "somthing went wrong", status: false });
    }
    catch (err) {
        console.log(err);

        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const removePropertyById = async (request, response, next) => {
    console.log(request.body._id)
    try {
        let result = await Property.findOneAndDelete({ _id: request.body._id})
        console.log(result)
        if (result)
            return response.status(200).json({ massage: "deleted successfully", status: true, result });

        return response.status(400).json({ massage: "somthing went wrong", status: false });
    }
    catch (err) {
        console.log(err);

        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const removePropertyDetailsById = async (request, response, next) => {
    try {
        let result = await db.collection("propertyDetails").deleteOne({ propertyID :request.body.propertyID })
        console.log(result);
        if (result)
            return response.status(200).json({ massage: "details of property deleted successfully", status: true});

        return response.status(400).json({ massage: "somthing went wrong", status: false });
    }
    catch (err) {
        console.log(err);

        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const showSubscriptions = async (request, response, next) => {
    try {
        let subscriptionList = await Subscription.findOne({ userId: request.body.userId });
        if (subscriptionList)
            return response.status(200).json({ message: "subscription is here", status: true, subscriptionList });


        return response.status(200).json({ massage: "please take subscription first", status: false });
    } catch (error) {
        console.log(error);

        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}


export const removeTenantRequest = async (request, response, next) => {
    console.log(request.body);
    try {
        let result = await HouseRequest.findOneAndDelete({ _id :request.body.id});
        if (result)
            return response.status(200).json({ massage: "tenant request deleted...", status: true});

        return response.status(400).json({ massage: "somthing went wrong", status: false });
    }
    catch (err) {
        console.log(err);

        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}


export const updateBalance = async (request, response, next) => {
    try {
        let result = await Admin.updateOne(
            {
                email: "riya@gmail.com"

            },
            {
                balance:request.body.balance
            }
        );
        return response.status(200).json({ message: "successfully credited to the admin account .....", result, status: true });

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}


export const findAdmin = async (request, response, next) => {
    try {
        let result = await Admin.find({email :'riya@gmail.com'});
        if (result)
            return response.status(200).json({ massage: "find admin data", status: true ,result});

        return response.status(400).json({ massage: "somthing went wrong", status: false });
    }
    catch (err) {
        console.log(err);

        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}


export const findPropertyByFurnishing = async(request, response, next) => {
    let propertyDetails = [];
    try {
        let result = await db.collection("propertyDetails").find({furnshing:request.body.category}).toArray();
        for(let details of result){
            let property = await Property.find({_id:details.propertyID});
            propertyDetails = [...propertyDetails,{property,details}];
        }
        if (propertyDetails)
            return response.status(200).json({ massage: "furnished data found", status: true ,propertyDetails});

        return response.status(400).json({ massage: "somthing went wrong", status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const propertyBy = async (request, response, next) => {
    console.log(request.body);
    try {
        let result = await Property.find({houseCategory:request.body.category});
        if (result){
            return response.status(200).json({ message: "success", status: true, result });
        }
            

        return response.status(200).json({ message: "wrong" });
    } catch (error) {
        console.log(error);
        return response.status(200).json({ message: "internal" });
    }
}