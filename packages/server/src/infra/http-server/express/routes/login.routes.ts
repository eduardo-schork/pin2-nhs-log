import { Router } from "express";
import { handleFindAdmin } from "../controllers/login.controller";

const loginRoute = Router();

loginRoute.get("/admin/login", handleFindAdmin);

export default loginRoute;
