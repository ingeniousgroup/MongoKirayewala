import mongoose from "mongoose";
const stateSchema = new mongoose.Schema({
 stateName:{
    type:String,
    trim : true
 }
});

export const State = mongoose.model("state",stateSchema);