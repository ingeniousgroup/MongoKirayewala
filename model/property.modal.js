import mongoose from "mongoose";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

if(dd<10) 
    dd='0'+dd; 
if(mm<10) 
    mm='0'+mm; 
today = dd+'/'+mm+'/'+yyyy;

const propertySchema = new mongoose.Schema({
    userId:{
       type : mongoose.Schema.Types.ObjectId,
       ref:"user"
    },
    description:{
        type:String,
        required:true
    },
    rent:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    houseCategory:{
        type:String,
        required:true
    },
    imagesUrlArray:[],
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    date:{
       type:String,
       defaultValue: today
    }
});
export const Property = mongoose.model("property",propertySchema);