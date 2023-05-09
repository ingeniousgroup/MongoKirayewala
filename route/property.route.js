import express from "express";
import { List, nearByHouse ,categoryCount} from "../controller/property.controller.js";

const router = express.Router();

router.get("/list",List);
router.post("/nearByHouse",nearByHouse);
router.get("/categoryCount",categoryCount);

export default router;
