const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, trim: true },
  productDesc: { type: String, required: true, minlength: [50, 'Description must be at least 50 characters'], maxlength: [100, 'Description cannot exceed 1000 characters']},
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  isActive: { type: Boolean, default: true },

  
  image: imageSchema,

   

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);


