const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema({
    categoryName: {
        type:String,
        required: [true, 'categpory name is required!'],
        unique: true,
        trim: true
    },

    categoryDesc:{
       type: String,
       trim: true,
       maxlength: [300, 'Description too long'],
    },

    image: imageSchema,

    isActive:{
        type: Boolean,
        default: true
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },


}, {timestamps: true})

module.exports = mongoose.model('Category', categorySchema)




