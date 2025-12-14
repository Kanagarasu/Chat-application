// import { sendWellcomeEmail } from "../emails/emailHandlers.js";

import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
// import {ENV} from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";


// signup code
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // if the any one of the fied is null then return message all fields are require
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if the password length in < 6
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

         // check if email is valid using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // check if the user is already exist or not. if exist then return message if the user is already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // encrypt the password using bcryptjs package
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // this data's are stored into the database
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save(); // Save first

        // Generate token 
        generateToken(savedUser._id, res);

        // send the response
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });


        // send a welcom email to user 

        // try{
        //     await sendWellcomeEmail(savedUser.email,savedUser.fullName,ENV.CLIENT_URL);
        // }
        // catch(err){
        //     console.error("fieled to send welcome email:",err);
        // }



    } catch (err) {
        console.log("Error in signup controller:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



// login code
export const login = async (req,res)=>{
    const {email,password}=req.body;
    try{
        // fetch the data from the database using email
        const user =await User.findOne({email});

        // check if the user is present or not
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
            // we never shows client which one is incorrect : password or email
        }

        // if the user is present so check the password

        // encrypt the user entered password and compare encrypted password and database encrypted password if it is match then isPasswordCorrect = true otherwise false 
        const isPasswordCorrect =await bcrypt.compare(password,user.password);

        // check the isPassword is true or not
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }

        // generete the token
        generateToken(user._id,res);


        // send the response as _id,fullName,email,profilepic
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        });

    }
    catch(err){
        console.log("error in login controller:",err);
        res.status(500).json({message:"Internal server error"});
    }
};



// logout code
// in this no any request reseved from the bady so write _ unstand of req
export const logout = async (_,res) =>{
    res.cookie("jwt","",{maxAge:0});
    // res.cookie("jwt",) this "jwt" => content is same as like a utils.js file => res.cookie("jwt", token,  

    res.status(200).json({message:"Logged out successfully"});
};


// // updateProfile code
export const updateProfile = async (req,res) =>{
    try{
        const {profilePic}=req.body;
        if(!profilePic) return res.status(400).json({message:"profile pic is required"});
        
        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic:uploadResponse.secure_url},
            {new:true}
        );

        res.status(200).json(updatedUser);
    }
    catch(err){
        console.log("error in update profile:",err);
        res.status(500).json({message:"Internal server error"});
    }
}; 