import prisma from "../config/db.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/bcryptUtils.js";
import asyncHandler  from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, location } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = await prisma.users.create({
        data: {
            name,
            email,
            password: hashedPassword,
            location
        },
    });
    res.status(201).json({
        message: "User registered successfully!",
    });
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
        where: { email },
    });

    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.status(200).json({
        message: "User logged in successfully!",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            location: user.location,
            role: user.role
        },
    });
});