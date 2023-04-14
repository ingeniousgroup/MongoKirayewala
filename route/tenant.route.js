import express from "express";
import { signup } from "../controller/tenant.conroller.js";

const router = express.Router();

router.post("/signup",signup);

export default router;
