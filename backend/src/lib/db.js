import mongoose from "mongoose";

export const connectDB= async ()=>{
    try{
        const {MONGO_URI}= process.env;
        if(!MONGO_URI) throw new Error("MONGO_URI is not found");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected:",conn.connection.host);
    }
    catch(err){
        console.log("error connection to mongodb:",err);
        process.exit(1);//1 status code means fail , 0 means success
    }
}