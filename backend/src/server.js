import express from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from 'path';
import { connectDB } from "./lib/db.js";

dotenv.config();

const app=express();
const __dirname = path.resolve();

const PORT = process.env.PORT ;

app.use(express.json());//req.body

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

// make ready for deployement

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    // other then mensioned url is load index.html file
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}

app.listen(PORT,()=>{
    console.log("server is running at port number :"+PORT);
    connectDB();
});