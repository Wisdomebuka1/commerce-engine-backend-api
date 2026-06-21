const {
  createProductService,
  getAllProductService,
  getProductByIdService,
  updateProductService,
  deleteProductService
} = require("../services/productServices");
const { uploadToCloudinary } = require("../helpers/cloudinaryUpload");


const createProductController = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // console.log("BODY RECEIVED:", req.body);
    // console.log("FILE RECEIVED:", req.file);

    if (!req.file?.path) {
      console.log("No image file");
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // console.log("Uploading to Cloudinary...");

    const uploadResult = await uploadToCloudinary(req.file.path);

    // console.log("Upload Result:", uploadResult);

    if (!uploadResult?.url) {
      console.log(" Cloudinary upload failed");
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const productData = {
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
      category: req.body.category,
      image: {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
      },
      createdBy: userId,
    };

    // console.log("FINAL PRODUCT DATA:", productData);

    // console.log("Saving to database...");

    const product = await createProductService(productData);

    console.log("PRODUCT SAVED:", product);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log("Create Product Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProductController = async (req, res) => {
  try {
    const products = await getAllProductService({});

    return res.status(200).json({
      succes: true,
      message: "fetched all products",
      data: products,
    });
  } catch (error) {
    console.log("can not fetch ll the product server error!");
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "product found successfully!",
      data: product,
    });
  } catch (error) {
    console.log("get productById Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await updateProductService(productId, req.body);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    console.log("error");
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await deleteProductService(productId);

    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not deleted!",
      });
    }

    return res.status(200).json({
      succes: true,
      message: "product deleted successfuly!",
    });
  } catch (error) {
    console.log(error)
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });

  }
};



module.exports = {
  createProductController,
  getAllProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
