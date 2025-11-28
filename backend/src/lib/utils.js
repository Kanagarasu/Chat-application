import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const { JWT_SECRET}=process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not configured");
    }
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, 
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        //http://localhost:3000 not secure .it is development phase
        //https://localhost:3000 is secure .it is production phase
    });

    return token;
};
