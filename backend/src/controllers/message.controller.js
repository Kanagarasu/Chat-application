import Message from "../models/message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts =async (req,res)=>{
    try{

        const loggedInUserId =req.user._id;
        const filteredUsers =await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        //{_id:{$ne:loggedInUserId}}=> it used to remove or filter the logged user and store remaining all users
        // select("-password") => used to not show the password in the console

        res.status(200).json(filteredUsers);
    }
    catch(err){
        console.log("error in getallcontacts:",err);
        res.status(500).json({Message:"server error"});
    }
}

export const getMessagesByUserId = async (req,res)=>{
    try{
        const myId= req.user._id;
        const {id:userToChatId}=req.params;

        // me and you
        // i send you the message 
        // you send me the message

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId},
            ]
        });

        res.status(200).json(messages);
    }
    catch(err){
        console.log("error in setMessages controller:",err.Message);
        res.status(500).json({message:"internal server error"});
    }
}

export const sendMessage = async (req,res) => {
    try{
        const {text,image} =req.body;
        const {id:receiverId} =req.params;
        const senderId = req.user._id;

        if(!text && !image){
            return res.status(400).json({message:"Text or image is required."});
        }

        if(senderId.equals(receiverId)){
            return res.status(400).json({message:"Cannot sent messages to yourself."});
        }
        const receiverExists = await User.exists({_id:receiverId});

        if(!receiverExists){
            return res.status(404).json({messaeg:"receiver not found"});
        }

        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage =new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });


        await newMessage.save();

        // todo:send message in real time if user is online - socket.io

        res.status(200).json(newMessage);
    }
    catch(err){
        console.log("error in sendMessage controller:",err);
        res.status(500).json({message:"internal server error"});
    }
}


export const getChatPartners = async (req,res) =>{
    try{
        const loggedInUserId =req.user._id;

        // find all the messages where the logged-in user is either sender or receiver

        const messages =await Message.find({
            $or:[{senderId:loggedInUserId},{receiverId:loggedInUserId}],
        });

        const getChatPartnerIds = [
            ...new Set(
                messages.map(msg=>
                    msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() :msg.senderId.toString()
                )
            ),
        ];

        const ChatPartners = await User.find({_id: {$in:getChatPartnerIds}}).select("-password");

        res.status(200).json(ChatPartners);


    }
    catch(err){
        console.log("error in getChatPartners:",err.message);
        res.status(500).json({message:"internal server error"});
    }
}