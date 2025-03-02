import prisma from "../config/db.js";
import asyncHandler  from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const addVote = asyncHandler(async(req, res, next) =>{
    const { pollId, userId, optionId } = req.body;
    const poll = await prisma.poll.findUnique({
        where: { id: pollId }
    })
    if(!poll){
        return next(new ErrorResponse("Poll doesn't exist", 401))
    }
    const vote = await prisma.PollVote.create({
        data: {
            optionId,
            pollId,
            userId
        }
    })
    res.status(201).json({
        message: "Vote added successfully",
        data: vote
    })
})
export const changeVote = asyncHandler(async(req, res, next)=>{
    const { pollId, userId, optionId } = req.body;
    let poll = await prisma.PollVote.findUnique({
        where: {id: pollId}
    })
    if(!poll){
        return next(new ErrorResponse("Poll doesn't exist", 401))
    }
    const vote = await prisma.PollVote.update({
        where: { id: pollId },
        data: {
            pollId,
            userId,
            optionId
        }
    })
    res.status(201).json({
        message: "Vote updated successfully",
        data: vote
    })
})