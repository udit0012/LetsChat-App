const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const { updateOne } = require("../models/Contacts");
const Contact = require("../models/Contacts");
const router = express.Router();
const User = require("../models/User")

router.post('/accesschat', fetchuser, async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.status(400).send("User ID not sent with request")
        }
        let isChat = await Contact.find({
            isGroupchat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        }).populate("users", "-password").populate("latestmessage")
        isChat = await User.populate(isChat, {
            path: "latestmessage.sender",
            select: "username pic email phoneno"
        })
        if (isChat.length > 0) {
            res.send(isChat[0])
        }
        else {
            let chatdata = {
                chatname: "sender",
                isGroupchat: false,
                users: [req.user.id, userId]
            }
            try {
                const createdchat = await Contact.create(chatdata)
                const fullchat = await Contact.find({ _id: createdchat.id }).populate("users", "-password")
                res.send(fullchat)
            } catch (error) {
                res.status(400).json({ error: 'Internal server error in Chat creation' })
            }
        }
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }
})
router.get('/fetchchats', fetchuser, async (req, res) => {
    try {
        let result = await Contact.find({users:{$elemMatch:{$eq:req.user.id}}}).populate("users","-password").populate("groupAdmin","-password").populate("latestmessage")
        result = await User.populate(result, {
            path: "latestmessage.sender",
            select: "username pic email phoneno"
        })
        res.send(result)
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }
})
router.post('/group/creategroup', fetchuser, async (req, res) => {
    try {
        if(!req.body.name){
            res.status(400).send("Please name the group")
        }
        if(!req.body.users){
            res.status(400).send("Please select members for group")
        }
        let users = await JSON.parse(req.body.users)
        if(users.length<2){
            res.status(400).send("Please select atleast 2 members for group")
        }
        users.push(req.user.id)
        let groupchat = await Contact.create({
            chatname:req.body.name,
            isGroupchat:true,
            users:users,
            groupAdmin:req.user.id
        })
        const fullgroupchat = await Contact.find({ _id: groupchat.id }).populate("users", "-password").populate("groupAdmin","-password")
        res.json(fullgroupchat)
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }
})
router.put('/group/renamegroup', fetchuser, async (req, res) => {
    
    try {
        const {chatId , chatname} = req.body
        const updatedChat = await Contact.findByIdAndUpdate(chatId,{chatname},{new:true}).populate("users", "-password").populate("groupAdmin","-password")

        if(!updatedChat){
            return res.status(400).send("Chat not found")
        }
        res.json(updatedChat)
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }

})
router.put('/group/removefromgroup', fetchuser, async (req, res) => {
    try {
        const {chatId , userId} = req.body
        updatedChat = await Contact.findByIdAndUpdate(chatId,{$pull:{users:userId}},{new:true}).populate("users", "-password").populate("groupAdmin","-password")

        if(!updatedChat){
            return res.status(400).send("Chat not found")
        }
        res.json(updatedChat)
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }
})
router.put('/group/addtogroup', fetchuser, async (req, res) => {
    try {
        const {chatId , userId} = req.body
        const updatedChat = await Contact.findByIdAndUpdate(chatId,{$push:{users:userId}},{new:true}).populate("users", "-password").populate("groupAdmin","-password")

        if(!updatedChat){
            return res.status(400).send("Chat not found")
        }
        res.json(updatedChat)
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }
})

module.exports = router