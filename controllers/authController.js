import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { ROLES } from "../utils/constants.js";
import bcrypt from 'bcryptjs'
import {hashPassword,comparePassword} from '../utils/passwordUtils.js'
import { UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register=async (req,res)=>{
    const isFirstUser=await User.countDocuments()===0;
    req.body.role=isFirstUser? ROLES.ADMIN:ROLES.USER;
    const hashedPassword=await hashPassword(req.body.password);
    req.body.password=hashedPassword;
    const user=await User.create(req.body);
    res.status(StatusCodes.OK).json({msg:'user Created'});
} 

export const login=async (req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email});
    const isValid=user && await comparePassword(req.body.password,user.password);
    console.log(user);
    if(!isValid ) throw new UnauthenticatedError('invalid credentials');
    const token=createJWT({userId:user._id,role:user.role});
   res.cookie('token',token,{
    httpOnly:true,
    expires:new Date(Date.now()+1000*24*60*60),
    secure:process.env.NODE_ENV==='production'
   })
    res.json({msg:'user logged In'});
} 

export const logout=(req,res)=>{
    console.log("user logged out");
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now())

    })
    res.status(StatusCodes.OK).json({msg:"user logged out"})
}