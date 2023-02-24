import express from "express";
import { index } from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", index)

export default router;