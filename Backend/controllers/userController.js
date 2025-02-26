
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  fetchAllUsers,
  createUser,
  fetchUserById,
  updatedUser,
  deleteUser,
  loginUserService
} from "../services/userServices.js";

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const { code, message, token, details } = await loginUserService(email, password);
    if (code === 200) {
      res.cookie("token-Cookie", token, { httpOnly: true, signed: true });
    }

    return res.status(code).json({ message, details, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}

export async function getAllUsers(req, res) {
  try {
    const { code, message, details } = await fetchAllUsers();

    return res.status(code).json({ message, details });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}

export async function fetchById(req, res) {
  try {
    const { code, message, details } = await fetchUserById(
      Number(req.params.id)
    );

    return res.status(code).json({ message, details });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}

export async function updatedUserById(req, res) {
  try {
    const { name, email, password } = req.body;
    const { code, message, details } = await updatedUser(
      name,
      email,
      password,
      Number(req.params.id)
    );

    return res.status(code).json({ message, details });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}

export async function postUser(req, res) {
  try {
    const { name, email, password, location, role } = req.body;

    if (!name || !email || !password || !location || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const { code, message, details } = await createUser(
      name,
      email,
      password,
      location,
      role
    );

    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
}

export async function deleteUserById(req, res) {
  try {
    const { code, message, details } = await deleteUser(Number(req.params.id));
    return res.status(code).json({ message, details });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}