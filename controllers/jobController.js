import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import dayjs from 'dayjs';

import { nanoid } from 'nanoid';
import { NotFoundError } from '../errors/customError.js';
let jobs=[{id:nanoid(),company:'Apple',position:'front-end'},{id:nanoid(),company:'Google',position:'back-end'}]

export const getAllJobs=async(req,res)=>{
    console.log(req.user);
     const jobs =await  Job.find({createdBy:req.user.userId});
    res.status(StatusCodes.OK).json({jobs});
}

export const createJob=async (req,res)=>{
    req.body.createdBy=req.user.userId;
    const job=await Job.create(req.body);
    res.status(StatusCodes.OK).json({job});
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

export const showStats=async(req,res)=>{
    let stats=await Job.aggregate([
        {
            $match:{createdBy: new mongoose.Types.ObjectId(req.user.userId)}
        },
        {
            $group:{_id: '$jobStatus',count:{$sum:1}}
        }
    ]);
    console.log(stats)
    stats=stats.reduce((acc,curr)=>{
        const {_id,count}=curr;
        acc[_id]=count;
        return acc;
    },{})
    console.log(stats);
    let monthlyApplications=await Job.aggregate(
        [
            {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
            {
                $group:{
                    _id:{year:{$year:'$createdAt'},month:{$month:'$createdAt'}},
                    count:{$sum:1}
                }
            },{
                $sort:{'_id.year':-1,'_id:month':-1}
            },{
                $limit:6
            }
        ]
    )
    console.log(monthlyApplications)
    const defaultStats={
        pending:stats.pending||0,
        interview:stats.interview||0,
        declined:stats.declined||0
    };
    let monthlyApplicationsStats=[{date:'May 23',count:12},{date:'Jun 23',count:9},{date:'Jul 23',count:3}];
    res.status(StatusCodes.OK).json({defaultStats,monthlyApplicationsStats});
}