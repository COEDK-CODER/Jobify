import { body,validationResult,param } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE,ROLES } from "../utils/constants.js";

import Job from "../models/JobModel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";

const withValidationErrors=(validateValues)=>{
  
    return [validateValues,(req,res,next)=>{
     
        const errors=validationResult(req);
    
        if(!errors.isEmpty()){
            console.log(errors);
           const errorMessages=errors.array().map(x=>x.msg);
           
            if(errors.array()[0].msg.startsWith('no job')){
                throw new NotFoundError(errorMessages);
            }
            if(errors.array()[0].msg.startsWith('not authorized')){
                throw new UnauthorizedError('not authorized to this route')
            }
            throw new BadRequestError(errorMessages);
        }
        next();
    }]
}

export const validateJobInput=withValidationErrors(
    [
        body("company").notEmpty().withMessage("Company is required"),
        body("position").notEmpty().withMessage("position is required"),
        body("jobLocation").notEmpty().withMessage("jobLocation is required"),
        body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage('Inavlid Job Status'),
        body("jobType").isIn(Object.values(JOB_TYPE)).withMessage('Inavlid Job Type')
    ])

    export const validateIdParam=withValidationErrors([
        param('id').custom(async (x,{req})=>{
            const isValidId=mongoose.Types.ObjectId.isValid(x);
            if(!isValidId){
                throw new BadRequestError('Invalid Mongo DB Id');
            }
            const job=await Job.findById(x);
            console.log(job)
            if(!job){
                throw new NotFoundError(`no job with id ${x}`);
            }
            const isAdmin=req.user.role;
            const isOwner=req.user.userId===job.createdBy.toString();
            if(!isAdmin && !isOwner){
                throw new UnauthorizedError('not authorized to access this route')
            }  
        } )
    ])

    export const validateUserInput=withValidationErrors([
        body('name').notEmpty().isLength({min:4,max:12}).withMessage('Invalid username'),
        body('email').notEmpty().withMessage("Invalid Email").isEmail().withMessage("Invalid Email").
        custom(async(email)=>{
            const user=await User.findOne({email});
            if(user){
                throw new BadRequestError('email already exists');
            }
        }),
        body('password').notEmpty().withMessage("Password is Required").isLength({min:5}).withMessage('Minimum 5 chars required'),
        body('lastName').notEmpty().isLength({min:4,max:10}).withMessage('Invalid lastName'),
        body('location').notEmpty().isLength({min:5,max:15}).withMessage('Invalid location'),
    ]);


    export const validateUserLoginInput=withValidationErrors([

        body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email"),
        body('password').notEmpty().withMessage("Password is Required")
    ]);

    export const validateUpdateUserInput=withValidationErrors([ 
        body('name').notEmpty().isLength({min:4,max:12}).withMessage('Invalid username'),
        body('email').notEmpty().withMessage("Invalid Email").isEmail().withMessage("Invalid Email").
        custom(async({email,req})=>{
            const user=await User.findOne({email});
            if(user && user._id.toString()!==req.user.userId){
                throw new BadRequestError('email already exists');
            }
        }),
        body('lastName').notEmpty().isLength({min:4,max:10}).withMessage('Invalid lastName'),
        body('location').notEmpty().isLength({min:5,max:15}).withMessage('Invalid location'),]);