

import 'express-async-errors'
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import morgan from 'morgan';
import router from './routes/jobRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import { body ,validationResult } from 'express-validator';
import authRouter from './routes/authRoutes.js';
import { authenticateUser } from './middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app=express();
const port=process.env.PORT ||5000;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
const getData=async()=>{
    const reponse=await  fetch('https://www.course-api.com/react-useReducer-cart-project');
    const cartData=await reponse.json();
    console.log(cartData)

}


const __dirname=dirname(fileURLToPath(import.meta.url))
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
app.use(express.static(path.resolve(__dirname,'./public')))
// getData();


app.use(cookieParser())
app.use(express.json());
app.use("/api/v1/jobs",authenticateUser,router);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",authenticateUser,userRouter);



app.get("/api/v1/test",(req,res)=>{
    console.log("hitted");
    res.json({msg:"node server"});
})

// app.get("/api/v1/test/:id",[body('name').notEmpty().withMessage('name is required').isLength({min:3,max:10}).withMessage('Length Criteria')],
//     (req,res,next)=>{
//         const errors=validationResult(req);
//         if(!errors.isEmpty()){
//             res.status(400).json({msg:errors});
//         }
//         next()
//     }
//     ,(req,res)=>{
//     console.log(req.query);
//     console.log(req.params);
//     res.send("Hiited")
// ;})

app.post("/",(req,res)=>{

    res.json({message:'data received',data:req.body})
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
  });
app.use('*',(req,res)=>{
    res.send("not found");
})

app.use(errorHandlerMiddleware)
try {
    console.log('Connecting to DB ......')
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`server is running ${port}`)
    });
} catch (error) {
    console.log(error);
    console.log('DB Connection Failed:(')
    process.exit(1);
}
