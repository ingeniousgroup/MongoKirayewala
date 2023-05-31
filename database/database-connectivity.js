import mongoose from "mongoose";

mongoose.connect("mongodb+srv://theingeious:the.ingeious@kirayewala.vwavihw.mongodb.net/kirayewalaApi?retryWrites=true&w=majority").then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});

export default mongoose.connection;