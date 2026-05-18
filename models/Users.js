const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
   username:{
      type: String,
      required:[true, 'username field should not be empty!'],
      unique: true,
      trim: true,
     
   },

   email:{
       type: String,
       required:[true, 'email field must not be empty!'],
       unique: true,
   },

    password:{
       type: String,
       required:[true, 'password field must not be empty!'],
       
   },

   role:{
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
   },

   createdAt:{
      type: Date, default: Date.now
   },
  
},
{timestamps: true}
)

module.exports = mongoose.model('User', userSchema)