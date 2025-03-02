import { text } from "express";
import prisma from "../config/db.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createPoll = asyncHandler(async(req, res, next) =>{
    const { question, description, options, status, createdBy, expiresAt } = req.body
    const poll = await prisma.poll.create({
        data: {
            question, 
            description,
            status,
            createdBy,
            expiresAt,
            options: {
                create: options.map((option) => ({
                    text: option.text,
                }))
            }
        }
    })
    res.status(201).json({
        message: "Poll created successfully",
        data: poll
    })
})

export const allPolls = asyncHandler(async(req, res, next) => {
    const polls = await prisma.poll.findMany({
        include: {
            options: true
        }
    })
    if(polls.length === 0){
        return next(new ErrorResponse("No available poll"))
    }
    res.status(201).json({
        message: "Polls fetches successfully",
        data: polls
    })
})
export const fetchById = asyncHandler(async(req, res, next) => {
    const { id } = req.params
    const poll = await prisma.poll.findUnique({
        where: { id: id},
        include: { options: true }
    })
    if(!poll){
        return next(new ErrorResponse("Poll doesn't exist", 401))
    }
    res.status(201).json({
        message: "Pol fetched successfully",
        data: poll
    })
})
export const updatePoll = asyncHandler(async(req, res, next) =>{
    const { id } = req.params
    const { question, description, options, status, createdBy, expiresAt } = req.body
    let poll = await prisma.poll.findUnique({
        where: { id: id},
        include: { options: true}
    })
    if(!poll){
        return next(new ErrorResponse("Poll doesn't exist", 401))
    }
    const optionUpdates = options.filter(option => option.id).map(option =>({
        where: { id: option.id},
        data: {
            text: option.text,
        }
    }))
    const optionCreations = options.filter(option => !option.id).map(option => ({
        text: option.text
    }))
    poll = await prisma.poll.update({
        where: { id: id },
        data: {
            question, 
            description,
            status,
            createdBy,
            expiresAt,
            options: {
                update: optionUpdates,
                create: optionCreations
            }
        },
        include: {
            options: true
        }
    })
    res.status(201).json({
        message: "Poll updated successfully",
        data: poll
    })
})
export const deletePoll = asyncHandler(async(req, res, next) =>{
    const { id } = req.params
    const poll = await prisma.poll.findUnique({
        where: { id: id}
    })
    if(!poll){
        return next(new ErrorResponse("Poll doesn't exist", 401))
    }
    await prisma.poll.delete({
        where: {id: id}
    })
    res.status(201).json({
        message: "Poll deleted successfully",
        data: poll
    })
})