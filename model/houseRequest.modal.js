import mongoose from "mongoose";

const houseRequestSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    propertyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"property",
    },
 
    message:{
        type:String
    },

    date:{
        type:String
    }

});

export const HouseRequest = mongoose.model("houserequest",houseRequestSchema);