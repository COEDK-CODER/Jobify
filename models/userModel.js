import mongoose from "mongoose";
import { type } from "os";
import { ROLES } from "../utils/constants.js";

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    lastName:{
        type:String,
        default:'lastName'
    },
    location:{
        type:String,
        default:'myCity'
    },
    role:{
        type:String,
        enum:Object.values(ROLES),
        default:ROLES.USER
    },
    avatar:{
        type:String
    },
    avatarPublicId:String

},{timestamps:true});

UserSchema.methods.toJSON=function(){
    let obj=this.toObject();
    delete obj.password;
    return obj;
}
export  default mongoose.model('User',UserSchema)