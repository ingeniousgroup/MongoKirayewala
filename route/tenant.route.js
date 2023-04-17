import express from "express";
import { add_to_wishList, change_password, forgot_password, house_request, remove_from_wishList, searching, signIn, signUp, update_profile, view_profile, view_property, view_wishList } from "../controller/tenant.conroller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/signup",
body("name","Name is required").notEmpty(),
body("email").isEmail(),
body("password").notEmpty(),
body("password").isLength({min: 6, max: 10}),
body("contact").notEmpty(),
body("contact").isNumeric(),signUp);

router.post("/signin",
body("email").isEmail().notEmpty(),
signIn);

router.post("/viewProperty",view_property);

router.post("/viewProfile",view_profile);

router.post("/updateProfile",update_profile);

router.post("/changePassword",change_password);

router.post("/forgotPassword",forgot_password);

router.post("/addToWishList",add_to_wishList);

router.post("/viewWishlist",view_wishList);

router.post("/removeFromWishList",remove_from_wishList);

router.post("/houseRequest",house_request);

router.post("/search",searching);

export default router;
