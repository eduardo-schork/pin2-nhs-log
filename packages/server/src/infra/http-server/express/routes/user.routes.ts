import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/admin/get", UserController.getUserById);

userRoutes.get("/user", UserController.findAll);

userRoutes.get("/user/:id", UserController.findOne);

userRoutes.post("/user", UserController.create);

userRoutes.delete("/user/:id", UserController.delete);

userRoutes.put("/user", UserController.update);

export default userRoutes;
