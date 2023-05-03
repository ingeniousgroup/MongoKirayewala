import mongoose from "mongoose";
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

    }

});
export const OwnerRequest = mongoose.model("ownerRequestByAdmin", ownerRequestSchema);