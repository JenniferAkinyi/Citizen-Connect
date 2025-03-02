import { Router } from "express";
import { addVote, changeVote } from "../controllers/votes.js";

const voteRouter = Router()

voteRouter.post('/vote', addVote)
voteRouter.patch('/vote', changeVote)

export default voteRouter;