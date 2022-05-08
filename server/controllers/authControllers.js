import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../Errors/index.js";

export const register = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    throw new BadRequestError("Please provide all fields");
  }
  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    throw new BadRequestError("Email already registered");
  }

  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastname: user.lastname,
      location: user.location,
      name: user.name,
    },
    token,
  });
};
export const login = async (req, res) => {
  res.send("login");
};
export const updateUser = async (req, res) => {
  res.send("updateUser");
};
