import express from "express";
import connectDB from './config/DB.js'
import cors from 'cors'
import userRouter from "./routes/userRoute.js";
import dotenv from 'dotenv'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

// db connection
connectDB()
dotenv.config();

// api end point
app.use("/api/user",userRouter)

app.get("/", (req,res) => {
    res.send('API working')
})

app.listen(PORT,() => {
    console.log(`port is running on ${PORT}`)
    
})