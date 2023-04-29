import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
 stateAndCity:{
    type:Array,
 }
});

export const StateCity = mongoose.model("stateCity",stateSchema);