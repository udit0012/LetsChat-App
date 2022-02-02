const mongoose = require("mongoose")
require("dotenv").config();

const mongoConnect = async ()=>{
    try {
        mongoose.connect(String(process.env.MONGO_URI),
            ()=>{
                console.log("Connected to mongo successfully")
            })
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = mongoConnect