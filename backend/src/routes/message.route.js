import express from "express";
import { getAllContacts ,getMessagesByUserId,sendMessage,getChatPartners} from "../controllers/message.controller.js";
import {protectRoute} from "../middileware/auth.middileware.js";
import {arcjetProtection} from "../middileware/arcjet.middileware.js";

const router =express.Router();

// the middilewares execute in order - so requests get rate-limited first ,then authenticated.
//this is actually mory efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middileware

// check if the user is athendicator or not
router.use(arcjetProtection,protectRoute);

// all chats or all contects shows in the leftsite 
router.get("/contacts",getAllContacts);


router.get("/chats",getChatPartners);

// one particular persion chats
router.get("/:id",getMessagesByUserId);

router.post("/send/:id",sendMessage);

export default router;