import { StatusCodes } from "http-status-codes";

class NotFoundError extends Error{
    constructor(msg){
        super(msg)
        this.name='NotFoundError',
        this.message=msg;
        this.StatusCode=StatusCodes.NOT_FOUND;
    }
} 

class BadRequestError extends Error{
    constructor(msg){
        super(msg)
        this.name='BadRequestError',
        this.message=msg;
        this.StatusCode=StatusCodes.BAD_REQUEST;
    }
} 

class UnauthenticatedError extends Error{
    constructor(msg){
        super(msg)
        this.name='UnauthenticatedError',
        this.message=msg;
        this.StatusCode=StatusCodes.UNAUTHORIZED;
    }
} 


class UnauthorizedError extends Error{
    constructor(msg){
        super(msg)
        this.name='UnauthorizedError',
        this.message=msg;
        this.StatusCode=StatusCodes.FORBIDDEN;
    }
} 
export {NotFoundError,BadRequestError,UnauthenticatedError,UnauthorizedError}