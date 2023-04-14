import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        
    },
    password: {
        type:String,
        required:true,
    },
    balance: {
        type:Number,
        required:true,
        defaultValue:0
    },

});
export const Admin = mongoose.model("admin",adminSchema);