import express  from "express";
import db from "./database/database-connectivity.js";
import bodyParser from "body-parser";
<<<<<<< HEAD
import AdminRouter from "./route/admin.route.js";
=======

import AdminRouter from "./route/admin.route.js"
import OwnerRouter from "./route/owner.route.js"

>>>>>>> ddec7bfaeb1133bfa06d5d3982475afb062a23fb
import TenantRouter from "./route/tenant.route.js";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/admin",AdminRouter);

app.use("/tenant",TenantRouter);

<<<<<<< HEAD
=======
app.use("/owner",OwnerRouter);

>>>>>>> ddec7bfaeb1133bfa06d5d3982475afb062a23fb
app.listen(3000,()=>{
   console.log("server Started");
});
