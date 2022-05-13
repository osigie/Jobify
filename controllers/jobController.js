import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../Errors/index.js";

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("Please provide all field");
  }

  req.body.createdBy = req.user.userId;
  const data = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job: data });
};
export const deleteJobs = async (req, res) => {
  res.send("deleteJobs");
};
export const getAllJobs = async (req, res) => {
  res.send("getAllJobs");
};

export const updateJobs = async (req, res) => {
  res.send("updateJobs");
};
export const showStats = async (req, res) => {
  res.send("showStats");
};
