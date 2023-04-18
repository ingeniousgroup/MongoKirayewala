
import mongoose from "mongoose";
import today from "../date.js";

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
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    date:{
       type:String,
       defaultValue: today
    }
});
export const Property = mongoose.model("property",propertySchema);