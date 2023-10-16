import { Router } from "express";
import { getUserById } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/admin/get", getUserById);

export default userRoutes;
