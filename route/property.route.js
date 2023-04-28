import express from "express";
import { body } from "express-validator";
import { List, nearByHouse } from "../controller/property.controller.js";

const router = express.Router();

router.get("/list",List);
console.log("in property route")
router.post("/nearByHouse",nearByHouse);

export default router;
