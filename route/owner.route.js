import express from "express";
import {signIn,signUp ,viewProperty , updateName, owner_change_password, owner_view_profile,  addProperty, updateProperty, viewEnquiry} from "../controller/owner.controller.js";
import { verifyToken } from "../Authentication/token.js";

const router = express.Router();

router.post("/signin",signIn);

router.post("/signup",signUp);

router.post("/view_porperty",viewProperty);

router.post("/update_name",updateName);

router.post("/updateproperty",updateProperty);

router.post("/owner_update_pass",owner_change_password);

router.post("/ownerprofile",owner_view_profile);

router.get("/viewenquiry",viewEnquiry);

router.post("/addproperty",addProperty);

export default router;