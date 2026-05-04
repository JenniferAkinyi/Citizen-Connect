import { Router } from "express";
import { reportIncident } from "../controllers/incidentController.js";

const incidentRouter = Router();

incidentRouter.post('/report', reportIncident)
// incidentRouter.get('/all', allIncidents)
// incidentRouter.get('/:id', fetchById)
// incidentRouter.patch('/:id', updateIncident)
// incidentRouter.delete('/:id', deleteIncident)
export default incidentRouter;