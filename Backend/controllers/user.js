import crypto from "crypto";
import prisma from "../config/db.js";
import { hashPassword } from "../utils/bcryptUtils.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { sendEmail } from "../utils/mailer.js";

export const allUsers = asyncHandler(async (req, res, next) => {
  const users = await prisma.users.findMany();

  if (users.length === 0) {
    return next(new ErrorResponse("No registered users available", 401));
  }
  res.status(201).json({
    message: "Users fetched successfully",
    data: users,
  });
});

export const fetchById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return next(new ErrorResponse("User doesn't exist", 401));
  }
  res.status(201).json({
    message: "User fetched successfully",
    data: user,
  });
});
export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, location } = req.body;
  const hashedPassword = await hashPassword(password);
  let user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return next(new ErrorResponse("User doesn't exist", 401));
  }
  user = await prisma.users.update({
    where: { id: id },
    data: { name, email, password: hashedPassword, location },
  });
  res.status(201).json({
    message: "User updated successfully",
    data: user,
  });
});
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: { id: id },
  });
  if (!user) {
    return next(new ErrorResponse("User doesn't exist", 401));
  }
  await prisma.users.delete({
    where: { id: id },
  });
  res.status(201).json({
    message: "User deleted successfully",
    data: user,
  });
});
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;
  const hashedPassword = await hashPassword(newPassword);
  let user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return next(new ErrorResponse("User doesn't exist", 401));
  }
  user = await prisma.users.update({
    where: { email: email },
    data: { password: hashedPassword },
  });

  await sendEmail(
    email,
    "Password Reset Confirmation",
    "Your password has been reset successfully."
  );

  res.status(200).json({
    message: "Password reset successfully",
    data: user,
  });
});
export const requestPasswordReset = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    return next(new ErrorResponse("User doesn't exist", 401));
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

  await prisma.users.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });
  const resetUrl = `${req.protocol}://${req.get('host')}/api/users/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      text: message,
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});