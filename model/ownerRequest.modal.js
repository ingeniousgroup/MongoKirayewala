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


const ownerRequestSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    propertyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"property",
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"

    },
    date:{
        type:String,
        default:today
    }
 
});
export const OwnerRequest = mongoose.model("ownerRequestByAdmin", ownerRequestSchema);
