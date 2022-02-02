const mongoose = require('mongoose');
const { Schema } = mongoose;

const Messageschema = new Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Contact"
    }
  },
  {
      timestamps:true
  });
  const Message = mongoose.model('Message', Messageschema);
  module.exports = Message;