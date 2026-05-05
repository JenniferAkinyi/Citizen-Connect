import { Router } from "express";
import { createPoll, fetchPolls, fetchPollById, editPoll, deletePoll} from "../controllers/pollController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js"

const pollRouter = Router()

pollRouter.post('/createpoll', authenticateUser, createPoll)
pollRouter.get('/allpolls', fetchPolls)
pollRouter.get('/:id', authenticateUser, fetchPollById)
pollRouter.patch('/:id', authenticateUser, editPoll)
pollRouter.delete('/:id', authenticateUser, deletePoll)

export default pollRouter;