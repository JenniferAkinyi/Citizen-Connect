import { Router } from "express";
import { addVote, changeVote, allVotes, fetchVoteById, deleteVote } from "../controllers/voteController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js"

const voteRouter = Router()

voteRouter.post('/vote', authenticateUser,  addVote)
voteRouter.patch('/updatevote', authenticateUser, changeVote)
voteRouter.get('/allvotes', authenticateUser, allVotes);
voteRouter.get('/:id', authenticateUser, fetchVoteById)
voteRouter.delete('/:id', authenticateUser, deleteVote)

export default voteRouter;