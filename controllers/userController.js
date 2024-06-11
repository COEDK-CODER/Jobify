import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js"
import Job from "../models/JobModel.js";

export const getCurrentUser=async (req,res)=>{
    const user=await User.findOne({_id:req.user.userId});
    res.status(StatusCodes.OK).json({user:user.toJSON()});
}

export const getApplicationStats=async (req,res)=>{
    const users=await User.countDocuments();
    const jobs=await Job.countDocuments();
    res.status(StatusCodes.OK).json({users,jobs});
}
export const updateUser=async (req,res)=>{
    const user={...req.body};
    
    delete user.password;

    User.findByIdAndUpdate(req.user.userId,user,{new:true})
    res.status(StatusCodes.OK).json({msg:"test"});
}