import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore =create((set)=>({
    
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,

    checkAuth: async () =>{
        try{
            const res =await axiosInstance.get("/auth/check");
            set({authUser:res.data});
        }
        catch(err){
            console.log("error in authcheck:",err);
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async (data) =>{
        set({isSigningUp:true});
        try{
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data}); 
            
            toast.success("Account created successfully!.");
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningUp:false});
        }
    },

    login: async (data) =>{
        set({isLoggingIn:true});
        try{
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data}); 
            
            toast.success("Logged in successfully!.");
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isLoggingIn:false});
        }
    },

    logout: async () =>{
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        }
        catch(error){
            toast.error("Error logging out");
            console.log("Logout error:",error);
        }
    },

    updateProfile: async (data) =>{
        try{
            const res =await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("profile updated successfully");
        }
        catch(err){
            console.log("error in update profile:",err);
            toast.error(err.response.data.message);
        }
    }
}));