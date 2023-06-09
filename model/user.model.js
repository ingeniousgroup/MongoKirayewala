import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    name:{
    type: String,
    required: true,
    trim: true
    },

    email:{
    type: String,
    required: true,
    trim: true,
    unique:true
    },

    password:{
    type: String,
    trim : true
    },

    contact:{
    type: Number,
    required: true,
    trim: true
    },

    role : {
     type: String,
     required:true,
     trim : true
    },

    longitude:Number,

    latitude:Number
});

export const User = mongoose.model("user",userSchema);