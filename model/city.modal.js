import mongoose from "mongoose";
const citySchema = new mongoose.Schema({
 cityName:{
    type:String,
    required:true
 }
});
export const City = mongoose.model("city",citySchema);