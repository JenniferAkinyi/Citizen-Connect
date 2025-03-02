import { Router } from "express";
import { reportIncident, allIncidents, fetchById, updateIncident, deleteIncident } from "../controllers/incidents.js";

const incidentRouter = Router();

incidentRouter.post('/report', reportIncident)
incidentRouter.get('/all', allIncidents)
incidentRouter.get('/:id', fetchById)
incidentRouter.patch('/:id', updateIncident)
incidentRouter.delete('/:id', deleteIncident)
export default incidentRouter;