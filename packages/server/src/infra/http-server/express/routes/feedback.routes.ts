import { Router } from "express";
import FeedbackController from "../controllers/feedback.controlle";

const feedbackRoutes = Router();

feedbackRoutes.get("/feedback", FeedbackController.findAll);

feedbackRoutes.get("/feedback/:id", FeedbackController.findOne);

feedbackRoutes.post("/feedback", FeedbackController.create);

feedbackRoutes.delete("/feedback/:id", FeedbackController.delete);

feedbackRoutes.put("/feedback", FeedbackController.update);

export default feedbackRoutes;
