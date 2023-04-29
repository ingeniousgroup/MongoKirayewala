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

});
export const OwnerRequest = mongoose.model("ownerRequestByAdmin", ownerRequestSchema);