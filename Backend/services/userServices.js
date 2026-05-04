import prisma from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/bcryptUtils.js";
import jwt from "jsonwebtoken";

export async function createUser(name, email, password, location, role) {
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        role,
      },
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      location: user.location,
      role: user.role,
    };
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Email already exists. Please a different email.");
    }
    throw new Error("Error creating new user");
  }
}

export async function loginUserService(email, password) {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const userPassword = user.password;
  const isPasswordValid = await comparePassword(password, userPassword);

  if (!isPasswordValid) {
    throw new Error("Invalid Credentials");
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "defaultSecretKey",
    { expiresIn: "1h" },
  );
  return {
    token,
    user,
  };
}

// getting all users
export async function fetchAllUsers() {
  const users = await prisma.users.findMany();
  return users;
}

// fetch a user by a specific id
export async function fetchUserById(id) {
  const user = await prisma.users.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

// update a user
export async function updatedUserService(name, email, password, id, role, location) {
  const existingUser = await prisma.users.findUnique({
    where: { id },
  });
  if (!existingUser) {
    throw new Error("User not found");
  }
  let hashedPassword = existingUser.password;
  if (password) {
    hashedPassword = await hashPassword(password);
  }
  const updatedUser = await prisma.users.update({
    where: { id },
    data: { name, email, password: hashedPassword, role, location },
  });
  return {
    name: updatedUser.name,
    password: updatedUser.password,
    email: updatedUser.email,
    role: updatedUser.role,
    location: updatedUser.location,
  };
}
// deleting an existing user
export async function deleteUserService(id) {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingUser) {
      throw new Error("User not found")
    }
    const user = await prisma.users.delete({
      where: {
        id: id,
      },
    });
    return {
      message: "User deleted successfully",
    };
}
