import express from "express";
import { index, searchByDate, searchByYear, searchByName, add, remove, edit } from "../controllers/birthsController.js";

const router = express.Router();

router.get("/", index)
// router.get("/search/", searchByDate)
// router.get("/search/date/:date", searchByDate)
// router.get("/search/year/:year", searchByYear)
// router.get("/search/name/:name", searchByName)
router.post("/add/", add)
router.patch("/edit/:name", edit)
router.delete("/remove/:name", remove)

export default router;