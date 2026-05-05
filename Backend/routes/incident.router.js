import { Router } from "express";
import {authenticateUser} from "../middlewares/authMiddleware.js"
import { reportIncident, getIncidents, getIncidentById, editIncident, deleteIncident } from "../controllers/incidentController.js";

const incidentRouter = Router();

incidentRouter.post('/report', authenticateUser, reportIncident)
incidentRouter.get('/allincidents', getIncidents)
incidentRouter.get('/:id', authenticateUser, getIncidentById)
incidentRouter.patch('/:id',authenticateUser, editIncident)
incidentRouter.delete('/:id', authenticateUser, deleteIncident)
export default incidentRouter;