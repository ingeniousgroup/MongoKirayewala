import express from "express";
import { List, nearByHouse ,categoryCount, propertyDetails} from "../controller/property.controller.js";

const router = express.Router();

router.get("/list",List);
router.post("/nearByHouse",nearByHouse);
router.get("/categoryCount",categoryCount);
router.post("/propertyDetails",propertyDetails);

export default router;
