// Import express. ಠ_ಠ
import express from "express";

// Import routers. ಠ_ಠ
import birthsRouter from "./birthsRouter.js"


// Import controllers. ಠ_ಠ
import { search, birthdays, login, showAllUsers, registerUser, createUser, deleteUser } from "../controllers/controller.js";

const router = express.Router();

router.get('/api/login/', login)
router.get('/api/search/', search)
router.get("/birthdays", birthdays);

router.get("/users/all", showAllUsers);
router.get("/api/register/", registerUser);
router.post("/api/register/", createUser);
router.delete("/user/delete/:username", deleteUser);

router.use("/api/birthdays", birthsRouter);


export default router;