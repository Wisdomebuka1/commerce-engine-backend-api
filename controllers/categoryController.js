const {
  createCategoryServices,
  getAllCategoryServices,
  getCategoryByIdService
} = require("../services/categoryServices");
const { uploadToCloudinary } = require("../helpers/cloudinaryUpload");

const createCategoryController = async (req, res, next) => {
  try {
    const userId = req?.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    console.log("BODY RECEIVED:", req.body);
    console.log("FILE RECEIVED:", req.file);

    if (!req.file?.path) {
      console.log("No image file");
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    console.log("Uploading to Cloudinary...");

    const uploadResult = await uploadToCloudinary(req.file.path);

    console.log("Upload Result:", uploadResult);

    if (!uploadResult?.url) {
      console.log(" Cloudinary upload failed");
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const categoryData = new Category({
      categoryName: req.body.categoryName,
      categoryDesc: req.body.categoryDesc,
      image: {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
      },
      createdBy: userId,
    });

    console.log(categoryData);

    const category = await createCategoryServices(categoryData);

    return res.status(201).json({
      success: true,
      mesage: "Category created successfully!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
   
    const category = await getAllCategoryServices();

    return res.status(200).json({
        success: true,
        message: 'All categories fetched!',
        data: category
    })
  } catch (error) {
    console.log(error)
      return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategoryByIdController = async(req, res)=>{
    try{
       const categoryId = req.params.id;
       const category = await getCategoryByIdService(categoryId)

       res.status(200).json({
         success: true,
         message: "Fetch all categories successfully!",
         data: category
       })

       
    }catch(error){
       console.log(error)
        res.status(error.statusCode || 500).json({
           success: false,
           message: error.message
        })
    }
}

module.exports = {
  createCategoryController,
  getAllCategoryController,
  getCategoryByIdController
  
  
};
