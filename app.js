import express  from "express";
import bodyParser from "body-parser";
import AdminRouter from "./route/admin.route.js"
import OwnerRouter from "./route/owner.route.js"
import TenantRouter from "./route/tenant.route.js";
import PropertyRouter from "./route/property.route.js";
import Payement from './route/Payement.route.js';
import UserRouter from './route/user.route.js';
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";
import mongoose from "mongoose";
env.config();
const upload = multer({dest:'uploads/'});
const app = express();
// mongoose.connect("mongodb+srv://theingeious:pRbFe82Vp0Rw1mxE@kirayewala.vwavihw.mongodb.net/kirayewalaApi?retryWrites=true&w=majority").then(()=>console.log("Database Connected...")).catch((err)=>console.log(err));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,"public")));
app.use("/admin",AdminRouter);
app.use("/tenant",TenantRouter);
app.use("/owner",OwnerRouter);
app.use("/property",PropertyRouter);
app.use("/payment",Payement);
app.use('/user',UserRouter);
app.listen(3000,()=>{
   console.log("server Started");
});