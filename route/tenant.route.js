import express from "express";
<<<<<<< HEAD
import { add_to_wishList, change_password,viewPropertyList, forgot_password, house_request, remove_from_wishList, searching, signIn, signUp, update_profile, view_profile, view_property, view_wishList } from "../controller/tenant.conroller.js";
=======
import { addToWishList, changePassword, forgotPassword, houseRequest, removeFromWishList, searching, signIn, signUp, updateProfile, viewProfile, viewProperty, viewWistlist,  visitCount} from "../controller/tenant.conroller.js";
>>>>>>> 1a431bafd46dc14ec128a6d89976c863f627bcc9
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

<<<<<<< HEAD
router.get('/proertyList',viewPropertyList);
=======
router.post("/profileVisit",visitCount);

// router.get('/proertyList',viewPropertyList);

>>>>>>> 1a431bafd46dc14ec128a6d89976c863f627bcc9
export default router;
