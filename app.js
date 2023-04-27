import express  from "express";
import db from "./database/database-connectivity.js"
import bodyParser from "body-parser";
import cors from "cors";
import AdminRouter from "./route/admin.route.js"
import OwnerRouter from "./route/owner.route.js"
import TenantRouter from "./route/tenant.route.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/admin",AdminRouter);
app.use("/tenant",TenantRouter);


app.use("/owner",OwnerRouter);

app.listen(3000,()=>{
   console.log("server Started");
});
