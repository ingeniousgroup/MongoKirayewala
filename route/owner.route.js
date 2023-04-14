import express from "express";
import { signIn,signUp ,viewProperty ,updateproperty, updateName, owner_change_password, owner_view_profile, viewenquiry} from "../controller/owner.controller.js";

const router = express.Router();

router.post("/signin",signIn);

router.post("/signup",signUp);

router.post("/view_porperty",viewProperty);

router.post("/update_name",updateName);

router.post("/updateproperty",updateproperty);

router.post("/owner_update_pass",owner_change_password);

router.post("/ownerprofile",owner_view_profile);

router.get("/viewenquiry",viewenquiry);

export default router;