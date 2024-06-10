

import 'express-async-errors'
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import morgan from 'morgan';
import router from './routes/jobRoutes.js';
import mongoose from 'mongoose';



import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import { body ,validationResult } from 'express-validator';

const app=express();
const port=process.env.PORT ||5000;


const getData=async()=>{
    const reponse=await  fetch('https://www.course-api.com/react-useReducer-cart-project');
    const cartData=await reponse.json();
    console.log(cartData)

}


// getData();
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.json());
app.use("/api/v1/jobs",router);

app.get("/api/v1/test/:id",[body('name').notEmpty().withMessage('name is required').isLength({min:3,max:10}).withMessage('Length Criteria')],
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({msg:errors});
        }
        next()
    }
    ,(req,res)=>{
    console.log(req.query);
    console.log(req.params);
    res.send("Hiited")
;})

app.post("/",(req,res)=>{

    res.json({message:'data received',data:req.body})
})

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
