import mongoose from "mongoose";
import today from "../date.js";

const houseRequestSchema = new mongoose.Schema({
 
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
   
    propertyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "property"
    },
   
    message:{
        type:String
    },

    date:{
        type:String,
        default : today
    }

});

export const HouseRequest = mongoose.model("houserequest",houseRequestSchema);