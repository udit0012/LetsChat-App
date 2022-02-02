const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneno:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
    }
  },
  {
      timestamps:true
  });
  const User = mongoose.model('User', UserSchema);
  module.exports = User;