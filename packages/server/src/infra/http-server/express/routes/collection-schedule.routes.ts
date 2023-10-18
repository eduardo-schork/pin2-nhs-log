import { Router } from "express";

import CollectionScheduleController from "../controllers/collection-schedule.controller";

const collectionScheduleRoutes = Router();

collectionScheduleRoutes.get("/collection-schedule", CollectionScheduleController.findAll);

collectionScheduleRoutes.get("/collection-schedule/:id", CollectionScheduleController.findOne);

collectionScheduleRoutes.post("/collection-schedule", CollectionScheduleController.create);

collectionScheduleRoutes.delete("/collection-schedule/:id", CollectionScheduleController.delete);

collectionScheduleRoutes.put("/collection-schedule", CollectionScheduleController.update);

export default collectionScheduleRoutes;
