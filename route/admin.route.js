import express from "express";
import { body } from "express-validator";
import { viewBalance, signIn, signUp, viewOwners, viewTenants, changePassword, viewHouseRequest, removeOwner, removeTenant } from "../controller/admin.controller.js";
const router = express.Router();
router.post("/signup", body("email", "invalid email").isEmail(),
    body("password", "must be 5 character and numeric").isNumeric().isLength({ min: 5 }),
    body("balance", "only numeric").isNumeric(),
    signUp);
router.post("/signin", signIn);
router.post("/view_balance", viewBalance);
router.post("/view_tenants", viewTenants);
router.post("/view_owners", viewOwners);
router.post("/change_password",changePassword);
router.get("/view_house_request",viewHouseRequest);
router.post("/remove_owner",removeOwner);
router.post("/remove_tenant",removeTenant);

export default router;

