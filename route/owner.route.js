import express from "express";

import { signIn,signUp ,viewProperty ,updateProperty, addPropertyDetails, owner_change_password,addProperty, owner_view_profile, viewEnquiry,subscription ,expireSubscription} from "../controller/owner.controller.js";
import { body } from "express-validator";


const router = express.Router();

router.post("/signin",signIn);

router.post("/signup",
body('name').not().isEmpty().trim().withMessage('Name field is required'),
body("email","invalid email").isEmail(),
body("password","must be 5 character ").isLength({min:5}),
body('contact')
.not().isEmpty().trim().withMessage('Phone Number field is required')
.isNumeric().withMessage('Phone Number field can only contain Numbers')
.isLength({min: 10, max: 13}).withMessage('Phone Number field can only contain minimum of 11 and max of 13 digits respectively'),
body("role","Role must be exist").isAlpha(),
body("longitude","Longitude must be exist").isNumeric(),
body("latitude","Longitude must be exist").isNumeric(),
signUp);

router.post("/view_porperty",viewProperty);

router.post("/updateproperty",updateProperty);


router.post("/owner_update_pass",owner_change_password);

router.post("/ownerprofile",owner_view_profile);


router.post("/addproperty",addProperty);

router.get("/viewenquiry",viewEnquiry);

router.post("/subscription",subscription);

router.post("/expireSubscription",expireSubscription);

router.post("/propertyDetails" , addPropertyDetails);

export default router;