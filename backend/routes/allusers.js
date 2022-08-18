const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const User = require("../models/User")

router.get('/user', fetchuser, async (req, res) => {
    try {
        const searchQuery = req.query.search
        const keyword = searchQuery ? {
            $or: [
                { username: new RegExp(searchQuery,'i') },
                { email: new RegExp(searchQuery,'i') },
            ]
        } : {};
        const users = await User.findOne(keyword).find({_id:{$ne:req.user.id}})
        res.json(users)
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"})
    }

})

module.exports = router