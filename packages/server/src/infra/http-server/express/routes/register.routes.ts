import { Router } from "express";
import { handleRegisterAdmin } from "../controllers/register.controller";

const registerRoute = Router();

registerRoute.post("/admin/register", handleRegisterAdmin);

export default registerRoute;
