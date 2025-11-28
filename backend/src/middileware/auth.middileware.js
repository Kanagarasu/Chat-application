import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js"

export const productRoute = async (req,res,next) =>{
    try{
        const token = req.cookies.jwt;
        //jwt is same as utils.js file res.cookie("jwt", token,

        // check if the token exists or not
        if(!token){
            return res.status(401).json({message:"Unauthorized - no token provided"});
        }

        // check if it is valide or not
        const decoded =jwt.verify(token,ENV.JWT_SECRET);
        if(!decoded) return res.status(401).json({message:"Unauthorized -invalid token"});

        // check if the user is present in database or not
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        
        req.user =user;

        next();
    }
    catch(err){
        console.log("error in protectRoute middileware:",err);
        res.status(500).json({message:"Internal server error"});
    }
}