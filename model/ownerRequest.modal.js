import mongoose from "mongoose";
import today from "../date.js";
const ownerRequestSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    propertyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"property",
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"

    },
    date:{
        type:String,
        default:today
    }
});
export const OwnerRequest = mongoose.model("ownerRequestByAdmin", ownerRequestSchema);
