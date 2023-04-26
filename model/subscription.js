import mongoose, { mongo } from "mongoose";
import today from "../date.js";
import expiryDate from "../expiryDate.js";
console.log(expiryDate)
const subscriptionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    subscriptionPrice:{
        type:Number,
        default:499
    },
    startDate:{
        type:String,
        default : today,
        required:true
    },
    subscriptionExpiry:{
        type:String,
        default:expiryDate
    }
})

export const Subscription = mongoose.model("subscription",subscriptionSchema);