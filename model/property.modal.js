
import mongoose from "mongoose";
import today from "../date.js";
const propertySchema = new mongoose.Schema({
    userId:{
       type : mongoose.Schema.Types.ObjectId,
       ref:"user"
    },
    description:{
        type:String,
        required:true,
        trim : true
    },
    rent:{
        type:String,
        required:true,
        trim : true
    },
    address:{
        type:String,
        required:true,
        trim : true
    },
    status:{
        type:String,
        required:true,
        trim : true
    },
    houseCategory:{
        type:String,
        required:true,
        trim : true
    },
    imagesUrlArray:[],
    latitude:{
        type:String,
        trim : true
    },
    longitude:{
        type:String,
        trim : true
    },
    locationAddress:{
        type:String,
        required:true,
        trim : true
    },
    date:{
       type:String,
       default: today,
       trim : true
    }
});
export const Property = mongoose.model("property",propertySchema);