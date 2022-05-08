import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../Errors/index.js";

export const register = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    throw new BadRequestError("Please provide all fields");
  }
  const userAlreadyExist = User.findOne({ email: email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email already registered");
  }
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
export const login = async (req, res) => {
  res.send("login");
};
export const updateUser = async (req, res) => {
  res.send("updateUser");
};
