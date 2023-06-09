import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
    userId:{

        type: mongoose.Schema.Types.ObjectId,
        ref: "user"

    },
    wishListItems:[{
        propertyId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "property"
        }
    }]
});

export const WishList = mongoose.model("wishlist",wishListSchema);