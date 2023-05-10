
import mongoose from "mongoose";
import today from "../date.js";
console.log(today);
const propertySchema = new mongoose.Schema({
    userId:{
       type : mongoose.Schema.Types.ObjectId,
       ref:"user"

    },
    description:{
        type:String,
        required:true
    },
    rent:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    houseCategory:{
        type:String,
        required:true
    },
    imagesUrlArray:[],
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    locationAddress:{
        type:String,
        required:true
    },
    date:{
       type:String,
       default: today
    }
});
export const Property = mongoose.model("property",propertySchema);