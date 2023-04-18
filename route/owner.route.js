import express from "express";

import { signIn,signUp ,viewProperty ,updateProperty, updateName, owner_change_password,addProperty, owner_view_profile, viewEnquiry} from "../controller/owner.controller.js";


const router = express.Router();

router.post("/signin",signIn);

router.post("/signup",signUp);

router.post("/view_porperty",viewProperty);

router.post("/update_name",updateName);

router.post("/updateproperty",updateProperty);


router.post("/owner_update_pass",owner_change_password);

router.post("/ownerprofile",owner_view_profile);


router.post("/addproperty",addProperty);

router.get("/viewenquiry",viewEnquiry);


export default router;