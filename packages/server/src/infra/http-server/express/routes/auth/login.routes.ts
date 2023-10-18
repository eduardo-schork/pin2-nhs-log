import { Router } from "express";
import { handleFindAdmin } from "../../controllers/auth/login.controller";

const loginRoutes = Router();

loginRoutes.get("/admin/login", handleFindAdmin);

export default loginRoutes;
