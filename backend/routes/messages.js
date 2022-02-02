const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Contact = require("../models/Contacts");
const Message = require("../models/Message");
const User = require("../models/User");

router.post('/sendmessage', fetchuser, async (req, res) => {
    const {chatId, msg} = req.body
    if(!chatId || !msg){
        return res.status(400).json({error:"Invalid message send request"})
    }
    try {
        var message = await Message.create({
            sender: req.user.id,
            content:msg, 
            chat:chatId,
        })
        message = await message.populate("sender","username pic")
        message = await message.populate("chat")
        // message = await Message.find({_id: message._id}).populate("sender","username pic").populate("chat")
        message = await User.populate(message,{
            path:"chat.users",
            select:"username pic phoneno"
        });
        await Contact.findByIdAndUpdate(chatId,{
            latestmessage:message
        });
        res.json(message)
    } catch (error) {
        return res.status(500).send("Internal server error")
        
    }
})
router.get('/fetchallmessages/:chatId', fetchuser, async (req, res) => {
    try {
        const allmsgs = await Message.find({chat:req.params.chatId}).populate("sender","username pic phoneno").populate("chat")
        res.json(allmsgs)
    } catch (error) {
        return res.status(500).send("Internal server error")
        
    }
})

module.exports = router