import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/admin/get", UserController.getUserById);

userRoutes.get("/admin", UserController.findAll);

// userRoutes.get("/admin/:id", UserController.findOne);

userRoutes.post("/admin", UserController.create);

userRoutes.delete("/admin", UserController.delete);

userRoutes.put("/admin", UserController.update);

export default userRoutes;
