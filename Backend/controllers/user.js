import prisma from "../config/db.js";
import { hashPassword} from "../utils/bcryptUtils.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const allUsers = asyncHandler(async (req, res, next) =>{
    const users = await prisma.users.findMany()

    if(users.length === 0){
        return next(new ErrorResponse("No registered users available", 401))
    }
    res.status(201).json({
        message: "Users fetched successfully",
        data: users
    })
})

export const fetchById = asyncHandler(async(req, res, next) =>{
    const { id } = req.params;
    const user = await prisma.users.findUnique({
        where: {
            id: id
        }
    })
    if(!user){
        return next(new ErrorResponse("User doesn't exist", 401))
    }
    res.status(201).json({
        message: 'User fetched successfully',
        data: user
    })
})
export const updateUser = asyncHandler(async(req, res, next)=> {
    const { id } = req.params;
    const { name, email, password, location} = req.body;
    const hashedPassword = await hashPassword(password);
    let user = await prisma.users.findUnique({
        where: {
            id: id
        }
    })
    if(!user){
        return next(new ErrorResponse("User doesn't exist", 401))
    }
    user = await prisma.users.update({
        where: {id: id},
        data: { name, email, password: hashedPassword, location}
    })
    res.status(201).json({
        message: 'User updated successfully',
        data: user
    })
})
export const deleteUser = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
        where: {id: id}
    });
    if(!user){
        return next(new ErrorResponse("User doesn't exist", 401))
    }
    await prisma.users.delete({
        where: {id: id}
    })
    res.status(201).json({
        message: 'User deleted successfully',
        data: user
    })
})