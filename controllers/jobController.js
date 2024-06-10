import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes';


import { nanoid } from 'nanoid';
import { NotFoundError } from '../errors/customError.js';
let jobs=[{id:nanoid(),company:'Apple',position:'front-end'},{id:nanoid(),company:'Google',position:'back-end'}]

export const getAllJobs=async(req,res)=>{
     const jobs =await  Job.find({});
    res.status(StatusCodes.OK).json({jobs});
}

export const createJob=async (req,res)=>{
    const job=await Job.create(req.body);
    res.status(StatusCodes.ACCEPTED).json({job});
};

export const getSingleJob=async (req,res)=>{
    const job=await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json(job);
};

export const updateJob=async(req,res)=>{
    const updatedJob=await Job.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(StatusCodes.OK).json({msg:"Job Modified",updateJob});
 };

 export const deleteJob=async(req,res)=>{
    const removedJob=await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({msg:"job deleted",removedJob});
};