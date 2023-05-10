import express  from "express";
import bodyParser from "body-parser";
import AdminRouter from "./route/admin.route.js"
import OwnerRouter from "./route/owner.route.js"
import TenantRouter from "./route/tenant.route.js";
import PropertyRouter from "./route/property.route.js";
import multer from "multer";
const upload = multer({dest:'uploads/'});
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


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

app.listen(3000,()=>{
   console.log("server Started");
});
