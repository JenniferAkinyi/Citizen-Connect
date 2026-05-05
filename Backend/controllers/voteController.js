import prisma from "../config/db.js";
import { addVoteService, changeVoteService, allVotesService, fetchVoteByIdService, deleteVoteService } from "../services/voteService.js";

export async function addVote(req, res) {
  try {
    const userId = req.user?.id;
    const { pollId, optionId } = req.body;
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
    });
    if (!poll) {
      return res.status(400).json({ message: "Poll doesn't exist" });
    }
    const pollOption = await prisma.pollOption.findFirst({
      where: { 
        id: optionId, 
        pollId: pollId
    },
    });
    if (!pollOption) {
      return res.status(400).json({ message: "Poll option doesn't exist" });
    }
    if (poll.status !== "active") {
      return res
        .status(400)
        .json({ message: "Voting is not allowed for this poll" });
    }
    if (poll.expiresAt && new Date() > poll.expiresAt) {
      return res.status(400).json({ message: "Poll has expired" });
    }

    const existingVote = await prisma.pollVote.findUnique({
      where: {
        userId_pollId: {
          userId,
          pollId,
        },
      },
    });
    if (existingVote) {
      return res
        .status(400)
        .json({ message: "User has already voted in this poll" });
    }
    const vote = await addVoteService(userId, pollId, optionId);
    return res
      .status(200)
      .json({ message: "Vote casted successfully", details: vote });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
export async function changeVote(req, res){
    try {
        const userId = req.user?.id
        const {pollId, optionId} = req.body
        if(!optionId || !pollId){
            return res.status(400).json({message: "All fields are required"})
        }
        const vote = await changeVoteService(userId, pollId, optionId)
        return res.status(200).json({message: "Vote updated successfully", details: vote})  
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
export async function allVotes(req, res){
    try {
        const votes = await allVotesService()
        return res.status(200).json({message: "All votes fetched successfully", details: votes})
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}
export async function fetchVoteById(req, res){
    try {
        const {id} = req.params
        const vote = await fetchVoteByIdService(id)
        return res.status(200).json({message: "Vote fetched successfully", details: vote})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
export async function deleteVote(req, res){
    try {
        const {id} = req.params
        const result = await deleteVoteService(id)
        return res.status(200).json({result})
    } catch (error) {
        return res.status(200).json({ message: error.message})
    }
}