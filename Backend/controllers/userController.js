import {
  createUser,
  loginUserService,
  fetchAllUsers,
  fetchUserById,
  updatedUserService,
  deleteUserService,
} from "../services/userServices.js";

export async function postUser(req, res) {
  try {
    const { name, email, location, password, role } = req.body;
    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = createUser(name, email, password, location, role);
    res
      .status(201)
      .json({ message: "User registered successfully!", details: user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUserService(email, password);
    res.cookie("token-Cookie", token, { httpOnly: true, signed: true });
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

export async function fetchUsers(req, res) {
  try {
    const users = await fetchAllUsers();
    return res
      .status(200)
      .json({ message: "Users fetched successfully", details: users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export async function fetchById(req, res) {
  try {
    const user = await fetchUserById(req.params.id);
    return res.status(200).json({
      message: "User fetched successfully",
      details: user,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}
export async function updateUser(req, res) {
  try {
    const { name, email, password, role, location } = req.body;
    const user = await updatedUserService(
      name,
      email,
      password,
      req.params.id,
      role,
      location,
    );
    return res
      .status(200)
      .json({ message: "User updated successfully", details: user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
export async function deleteUser(req, res) {
  try {
    const result = await deleteUserService(req.params.id);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}
