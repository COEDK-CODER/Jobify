import { StatusCodes } from "http-status-codes";

function errorHandlerMiddleware(err,req,res,next){
        const StatusCode=err.StatusCode||StatusCodes.INTERNAL_SERVER_ERROR;
        const message=err.message||"some thing went wrong";
        res.status(StatusCode).json({message});}
  


export default errorHandlerMiddleware