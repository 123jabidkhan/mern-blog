import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();


//========================== database connection ==========================
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log('Mongodb is connected!');
}).catch(err=>{
    console.log('MOngodb connection error >>', err);
})
//========================== database connection ==========================

const app = express();
// PORT listening at 8001
const PORT  = 8001;
app.listen(PORT,(req, res)=>{
    console.log(`Server running at PORT = ${PORT}`);
})

// middlewares
app.use(express.json());

// routes
app.use('/api/user',userRouter);
app.use('/api/auth', authRoutes);



// middleware for internal errors handling
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})