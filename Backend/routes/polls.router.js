import { Router } from "express";
import { allPolls, createPoll, deletePoll, fetchById, updatePoll } from "../controllers/polls.js";

const pollRouter = Router()

pollRouter.post('/poll', createPoll)
pollRouter.get('/all', allPolls)
pollRouter.get('/:id', fetchById)
pollRouter.patch('/:id', updatePoll)
pollRouter.delete('/:id', deletePoll)

export default pollRouter;