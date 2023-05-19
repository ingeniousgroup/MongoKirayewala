import express from "express";
import { addToWishList, changePassword, forgotPassword, houseRequest, removeFromWishList, requestList, requestPropertyList, searching, searchingWithCategory, sendOtp, signIn, signUp, updateProfile, viewProfile, viewProperty, viewWistlist,  visitCount} from "../controller/tenant.conroller.js";
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

router.post("/viewProperty",viewProperty);

router.post("/viewProfile",viewProfile);

router.post("/updateProfile",updateProfile);

router.post("/changePassword",changePassword);

router.post("/forgotPassword",forgotPassword);

router.post("/addToWishList",addToWishList);

router.post("/viewWishlist",viewWistlist);

router.post("/removeFromWishList",removeFromWishList);

router.post("/houseRequest",houseRequest);

router.post("/search",searching);

router.post("/searchWithCategory",searchingWithCategory);

router.post("/profileVisit",visitCount);

router.post("/sendOtp",sendOtp);

router.post("/requestList",requestList);

router.post("/requestPropertyList",requestPropertyList);

export default router;
