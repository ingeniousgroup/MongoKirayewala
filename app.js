import express  from "express";
import db from "./database/database-connectivity.js"
import bodyParser from "body-parser";
import AdminRouter from "./route/admin.route.js"
import OwnerRouter from "./route/owner.route.js"
import TenantRouter from "./route/tenant.route.js";
import PropertyRouter from "./route/property.route.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use("/admin",AdminRouter);
app.use("/tenant",TenantRouter);
app.use("/owner",OwnerRouter);
app.use("/property",PropertyRouter);

app.listen(3000,()=>{
   console.log("server Started");
});
