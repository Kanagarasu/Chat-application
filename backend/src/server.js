// import express from "express";
// import dotenv from 'dotenv';
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import path from 'path';
// import { connectDB } from "./lib/db.js";
// import cookieParser from "cookie-parser";
// import { ENV } from "./lib/env.js";
// import cors from "cors";

// dotenv.config();

// const app=express();
// const __dirname = path.resolve();

// const PORT = process.env.PORT ;

// //payload too large error
// app.use(express.json({limit:"5mb"}));//req.body


// // chatgpt => origin:"http://localhost:5173"
// // original code => origin:ENV.CLIENT_URL
// app.use(cors({origin:"http://localhost:5173",credentials:true}));

// app.use(cookieParser());


// app.use("/api/auth",authRoutes);

// app.use("/api/messages",messageRoutes);

// // make ready for deployement

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname,"../frontend/dist")));

//     // other then mensioned url is load index.html file
//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
//     });
// }

// app.listen(PORT,()=>{
//     console.log("server is running at port number :"+PORT);
//     connectDB();
// });
import express from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from 'path';
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { ENV } from "./lib/env.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT ;

//payload too large error
app.use(express.json({limit:"5mb"}));//req.body


// chatgpt => origin:"http://localhost:5173https://chat-application-1-addj.onrender.com
// original code => origin:ENV.CLIENT_URL
app.use(cors({origin:"https://chat-application-1-addj.onrender.com",credentials:true}));

app.use(cookieParser());


app.use("/api/auth",authRoutes);

app.use("/api/messages",messageRoutes);

// make ready for deployement

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname,"../frontend/dist")));

//     // other then mensioned url is load index.html file
//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
//     });
// }

app.get('/',(req,res)=>{
    res.send("Api working");
})

server.listen(PORT,()=>{
    console.log("server is running at port number :"+PORT);
    connectDB();
});