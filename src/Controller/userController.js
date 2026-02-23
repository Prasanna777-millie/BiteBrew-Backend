import { User } from "../Model/userModel.js";
import bcrypt from "bcryptjs";
 
// Get all users
export const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
 
// Register / Save user
export const save = async (req, res) => {
  try {
    const { name, email, phone, dob, address, password, role } = req.body;
 
    if (!name || !email || !phone || !dob || !address || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ message: "Email already registered" });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const user = await User.create({
      name,
      email,
      phone,
      dob,
      address,
      password: hashedPassword,
      role: role || "Customer",
    });
 
    res.status(201).send({
      data: user,
      message: "User registered successfully",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
 
// Get user by ID
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
 
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
 
    res.status(200).send({ data: user, message: "User fetched successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
 
// Update user by ID
export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, dob, address, password } = req.body;
 
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(404).send({ message: "User not found" });
 
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.dob = dob ?? user.dob;
    user.address = address ?? user.address;
    if (password) user.password = await bcrypt.hash(password, 10);
 
    await user.save();
 
    res.status(200).send({ data: user, message: "User updated successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
 
// Delete user by ID
export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
 
    if (!user) return res.status(404).send({ message: "User not found" });
 
    await user.destroy();
 
    res.status(200).send({ message: "User deleted successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
 
// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: "Email and password required" });
 
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).send({ message: "Invalid email or password" });
 
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).send({ message: "Invalid email or password" });
 
    // Normally here you would create a JWT token
    res.status(200).send({
      message: "Login successful",
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};