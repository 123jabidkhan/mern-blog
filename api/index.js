import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
// routes
app.use('/api/user',userRouter);


//========================== database connection ==========================
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log('Mongodb is connected!');
}).catch(err=>{
    console.log('MOngodb connection error >>', err);
})
//========================== database connection ==========================

// PORT listening at 8001
const PORT  = 8001;
app.listen(PORT,(req, res)=>{
    console.log(`Server running at PORT = ${PORT}`);
})