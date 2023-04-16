import express from "express";
import { add_to_wishList, change_password, signUp, update_profile, view_profile, view_property } from "../controller/tenant.conroller.js";

const router = express.Router();

console.log("inside the tenant Router... ");
router.post("/signup",signUp);

router.post("/viewProperty",view_property);

router.post("/viewProfile",view_profile);

router.post("/updateProfile",update_profile);

router.post("/changePassword",change_password);

router.post("/addToWishList",add_to_wishList);

export default router;
