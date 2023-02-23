// Import express. ಠ_ಠ
import express from "express";

// Import routers. ಠ_ಠ
import birthsRouter from "./birthsRouter.js"


// Import controllers. ಠ_ಠ
import { birthdays, search } from "../controllers/controller.js";

const router = express.Router();

router.use('/', express.static('public'));
router.get('/api/search/', search)
router.get("/birthdays", birthdays);
router.use("/api/birthdays", birthsRouter);
// router.use("/deaths", eventRouter);
// router.use("/holidays", eventRouter);

export default router;