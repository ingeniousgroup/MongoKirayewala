import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    contact: {
        type: Number
        ,
        required: true

    },
    balance: {
        type: Number,
        required: true,
        defaultValue: 0
    },

});
export const Admin = mongoose.model("admin", adminSchema);