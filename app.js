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
import mongoose from "mongoose";
import db from "./database/database-connectivity.js";
const upload = multer({dest:'uploads/'});
const app = express();
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