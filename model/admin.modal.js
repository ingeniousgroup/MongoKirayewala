import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type:String,
<<<<<<< HEAD
        required:true        
=======

        required:true,
        
>>>>>>> ddec7bfaeb1133bfa06d5d3982475afb062a23fb
    },
    password: {
        type:String,

        required:true

    },
    balance: {
        type:Number,
        required:true,
        defaultValue:0
    },

});
export const Admin = mongoose.model("admin",adminSchema);