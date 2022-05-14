import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  NotFoundError,
  BadRequestError,
  unAuthenticatedError,
} from "../Errors/index.js";

import { checkPermissions } from "./checkPermission.js";

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
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  checkPermissions(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Job successfully deleted" });
};
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

export const updateJobs = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please provide all field");
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  checkPermissions(req.user, job.createdBy);

  const updated = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updated });
};

export const showStats = async (req, res) => {
  res.send("showStats");
};
