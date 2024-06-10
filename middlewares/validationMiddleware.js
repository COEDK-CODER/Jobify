import { body,validationResult,param } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

import Job from "../models/JobModel.js";
import mongoose from "mongoose";

const withValidationErrors=(validateValues)=>{
  
    return [validateValues,(req,res,next)=>{
     
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            if(errors.array()[0].msg.startsWith('no job')){
                throw new NotFoundError(errors.array());
            }
            throw new BadRequestError(errors.array());
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
        param('id').custom(async (x)=>{
            const isValidId=mongoose.Types.ObjectId.isValid(x);
            if(!isValidId){
                throw new BadRequestError('Invalid Mongo DB Id');
            }
            const job=await Job.findById(x);
            console.log("dines");
            console.log(job)
            if(!job){
                throw new NotFoundError(`no job with id ${x}`);
            }

        } )
    ])