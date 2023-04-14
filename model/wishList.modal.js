import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    userId:{
        type:Number,
        required:true
    },
});

export const WishList = mongoose.model("wishlist",wishListSchema);