import express from "express";
import { signup ,login , logout , updateProfile } from "../controllers/auth.controller.js";
import { productRoute } from "../middileware/auth.middileware.js";

const router=express.Router();

router.post("/signup",signup);


router.post("/login",login);
// login and logout use POST requests for important security and technical reasons
// Credentials must be sent in the body (NOT in URL)

// /login?email=test@gmail.com&password=1234   ❌ very insecure

// Sends credentials securely, creates session/token, not cacheable

router.post("/logout",logout);
// Removes token/session, prevents accidental triggers

// athendicator only update the profile that is the reson for i using midileware productRoute
router.put("/update-profile",productRoute,updateProfile);

router.get("/check",productRoute,(req,res)=>res.status(200).json(req.user));

export default router;