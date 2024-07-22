import express from 'express';

const app = express();

app.get('/',(req, res)=>{
    return res.send('data from server!!');
})

const PORT  = 8001;
app.listen(PORT,(req, res)=>{
    console.log(`Server running at PORT = ${PORT}`);
})