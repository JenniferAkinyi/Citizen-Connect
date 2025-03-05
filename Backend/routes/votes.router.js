import { Router } from "express";
import { addVote, allVotes, changeVote, getUserVotes, deleteVote} from "../controllers/votes.js";

const voteRouter = Router()

voteRouter.post('/vote', addVote)
voteRouter.patch('/vote', changeVote)
voteRouter.get('/user/:userId', getUserVotes);
voteRouter.get('/all', allVotes)
voteRouter.delete('/:id', deleteVote)

export default voteRouter;