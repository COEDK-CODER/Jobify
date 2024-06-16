import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js"
import Job from "../models/JobModel.js";
import cloudinary from 'cloudinary'
import {promises as fs} from 'fs'

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
    if(req.file){
        const response=await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        user.avatar=response.secure_url
        user.avatarPublicId=response.public_id;
    }
   const updatedUser=await User.findByIdAndUpdate(req.user.userId,user,{new:true})
   if(req.file && updateUser.avatarPublicId){
    await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId)
   }
    res.status(StatusCodes.OK).json({msg:"test"});
}