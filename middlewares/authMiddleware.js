import { UnauthenticatedError, UnauthorizedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser= (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        throw new UnauthenticatedError('authentication invalid');
    }
    try {
        console.log(verifyJWT(token))
        const {userId,role}=verifyJWT(token);
     
        req.user={userId,role};
        // console.log("aa")
        // console.log(req.cookies);
        console.log(next);
        next();
    } catch (error) {
         throw new UnauthenticatedError('authentication invalid');
    }
    
  
}

export const authorizePermissions=(...rest)=>{

    return (req,res,next)=>{
        console.log(rest);
        if(!rest.includes(req.user.role)){
            throw new UnauthorizedError('Unauthorized to this rooute');
        }
    next();

    }
    
}