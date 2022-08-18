const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
    chatname:{
        type: String,
        trim:true,
    },
    isGroupchat:{
        type: Boolean,
        default: false
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    latestmessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {
      timestamps:true
  });
  const Contact = mongoose.model('Contact', ContactSchema);
  module.exports = Contact;