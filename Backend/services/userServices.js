import prisma from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/bcryptUtils.js";
import jwt from "jsonwebtoken";

export async function createUser(name, email, password, location, role) {
  try {
    const hashedPassword = await hashPassword(password);
    console.log("Hashed Password:", hashedPassword);
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
      code: 200,
      message: "User added successfully",
      details: {
        id: user.id,
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role,
      },
    };
  } catch (error) {
    if (error.code === "P2002") {
      return {
        code: 400,
        message: "Email already exists. Please use a different email.",
      };
    }
    return {
      code: 500,
      message: "Error creating user",
      details: error.toString(),
    };
  }
}

export async function loginUserService(email, password) {

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return { code: 404, message: "User not found" };
    }
    const userPassword = user.password

    const isPasswordValid = await comparePassword(password, userPassword);

    if (!isPasswordValid) {
      return { code: 401, message: "Invalid credentials" };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "1h" }
    );
    return {
      code: 200,
      message: "Login successful",
      token,
      details: { id: user.id, email: user.email },
    };
  } catch (error) {
    return {
      code: 500,
      message: "Internal server error",
      details: error.toString(),
    };
  }
}

// getting all users
export async function fetchAllUsers() {
  try {
    const users = await prisma.users.findMany();

    if (users.length === 0) {
      return {
        code: 400,
        message: "Error fetching users",
        details: "users not found",
      };
    }
    return {
      code: 200,
      message: "Users fetched successfully",
      details: users,
    };
  } catch (error) {
    return {
      code: 500,
      message: "Error fetching users",
      details: error.toString(),
    };
  }
}

// fetch a user by a specific id
export async function fetchUserById(id) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return {
        code: 400,
        message: "User not found",
        details: `No user found with id ${id}`,
      };
    }
    return {
      code: 200,
      message: "User fetched successfully",
      details: user,
    };
  } catch (error) {
    return {
      code: 500,
      message: "Error fetching user needed",
      details: error.toString(),
    };
  }
}

// update a user
export async function updatedUser(name, email, password, id) {
  try {
    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return { code: 400, message: "User not found" };
    }

    let hashedPassword = user.password; 

    if (password && password !== user.password) {
      hashedPassword = await bcrypt.hash(password, 10); 
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: { name, email, password: hashedPassword },
    });

    return {
      code: 200,
      message: "User updated successfully",
      details: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    };
  } catch (error) {
    return {
      code: 500,
      message: "Error updating user",
      details: error.toString(),
    };
  }
}


// deleting an existing user
export async function deleteUser(id) {
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingUser) {
      return {
        code: 400,
        message: "User not found",
        details: `No user found with id ${id}`,
      };
    }
    const user = await prisma.users.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      message: "User deleted successfully",
      details: user,
    };
  } catch (error) {
    return {
      code: 500,
      message: "Error deleting users",
      details: error.toString(),
    };
  }
}