const Product = require("../models/Products");
const {createError} = require('../utils/createErrors')

const createProductService = async (data) => {
  const { productName, productDesc, price, quantity, category, image } = data;

  if (!productName || !productDesc || !price || !quantity || !category) {
     throw createError('All field must not be empty!', 400)
  }

    console.log(`this is image_url: ${image.url}`)
    console.log(`this is image_u: ${image.public_id}`)

  if (!image.url || !image.public_id) {
    throw createError('Product image is required!', 400)
  }

  const existingProduct = await Product.findOne({ productName });

  if (existingProduct) {
    throw createError('Product already exists', 409)
  }

  const product = await Product.create({
    productName,
    productDesc,
    price,
    quantity,
    category,
    image,
  });

  return product;
};


const getAllProductService = async () => {

    // const products = await Product.find({}).populate('category').populate('createdBy');

    const products = await Product.find({}).select('-createdAt -updatedAt -__v');

    if (products.length === 0) {
      throw createError('No products found!', 404)
    }

    return products;
  
};

const getProductByIdService = async (productId) => {

    if (!productId) {
      throw createError('No product id provided!', 400)
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw createError('No product with such id found', 404)
    }

    return product;
  
};


const updateProductService = async (productId, data) => {

  if (!productId || !data) {
    throw createError('No product id or data provided!', 400);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,   
    data,     
    {returnDocument: true} 
  );

  if (!updatedProduct) {
    throw createError("Product not found", 404);
  }

  return updatedProduct;
};



const deleteProductService = async (productId,) => {

  if (!productId) {
    throw createError('No product id provided to delete', 400);
  }

  const deleteProduct = await Product.findByIdAndDelete(
    productId,   
  
  );

  if (!deleteProduct) {
    throw createError("Product not deleted!", 404);
  }

  return deleteProduct;
};



module.exports = { 
  createProductService,
  getAllProductService, 
  getProductByIdService,
  updateProductService,
  deleteProductService

};
