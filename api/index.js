import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// mongodb connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log('Mongodb is connected!');
}).catch(err=>{
    console.log('MOngodb connection error >>', err);
})

app.get('/',(req, res)=>{
    return res.send('data from server!!');
})

// PORT listening at 8001
const PORT  = 8001;
app.listen(PORT,(req, res)=>{
    console.log(`Server running at PORT = ${PORT}`);
})