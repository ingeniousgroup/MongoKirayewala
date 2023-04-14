import mongoose from "mongoose";
const adminSchema=new mongoose.Schema({
    email:String,
    password:String,
    balance:String,
});
export const Admin=mongoose.model("admin",adminSchema);