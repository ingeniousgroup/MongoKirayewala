import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
 stateAndCity:{
    type:Array,
    trim : true
 }
});

export const StateCity = mongoose.model("stateCity",stateSchema);