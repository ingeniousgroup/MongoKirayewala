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
const houseRequestSchema = new mongoose.Schema({
 
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
   
    propertyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "property"
    },
   
    message:{
        type:String
    },

    date:{
        type:String,
        default : today
    }

});

export const HouseRequest = mongoose.model("houserequest",houseRequestSchema);