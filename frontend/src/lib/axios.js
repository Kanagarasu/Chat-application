import axios from "axios";


export const axiosInstance =axios.create({
    // original
    // baseURL:import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",

    // chatgpt
    baseURL:"http://localhost:3000/api",
    withCredentials:true,
});