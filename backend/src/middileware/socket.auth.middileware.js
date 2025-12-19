// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { ENV } from "../lib/env.js";

// export const socketAuthMiddleware = async (socket, next) => {
//   try {
//     // extract token from http-only cookies
//     const cookieHeader = socket.handshake.headers.cookie;

//     if (!cookieHeader) {
//       return next(new Error("Unauthorized - No Cookie"));
//     }

//     const token = cookieHeader
//       .split("; ")
//       .find((row) => row.startsWith("jwt="))
//       ?.split("=")[1];

//     if (!token) {
//       return next(new Error("Unauthorized - No Token"));
//     }

//     // verify JWT
//     const decoded = jwt.verify(token, ENV.JWT_SECRET);

//     // find user
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return next(new Error("User not found"));
//     }

//     // attach user info to socket
//     socket.user = user;
//     socket.userId = user._id.toString();

//     console.log(
//       `Socket authenticated: ${user.fullName} (${user._id})`
//     );

//     next();
//   } catch (err) {
//     console.error("Socket auth error:", err.message);
//     next(new Error("Unauthorized"));
//   }
// };


import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {ENV} from "../lib/env.js";


export const socketAuthMiddleware =async (socket,next)=>{
    try{
        // extract token from http-only cookies
        const token =socket.handshake.headers.cookie
        ?.split("; ")
        .find((row)=> row.startsWith("jwt="))
        ?.split("=")[1];

        if(!token){
            console.log("Socket connection rejected: No tocken provided");
            return next(new Error ("Unauthorized -No Token Provided"));
        }

        // verify the token
        const decoded =jwt.verify(token,ENV.JWT_SECRET);
        if(!decoded){
            console.log("Socket connection rejecded: Invalid token");
            return next(new Error ("Unauthorized - Invalid Token"));
        }
        
        // find the user from the database
        const user =await User.findById(decoded.userId).select("-password");
        if(!user){
            console.log("Socket connection rejected: user not found");
            return next(new Error("User not found"));
        }

        // attach user info to socket 
        socket.user=user;
        socket.userId=user._id.toString();

        console.log(`Socket authenticated for user:${user.fullName}(${user._id})`);

        next();


    }
    catch(err){
        console.log("Error in socket authentication:", err.message);
        next(new Error("Unauthorized - Authentication failed"));
    }
};