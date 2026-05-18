const Category = require('../models/Category')
const {createError} = require('../utils/createErrors')

const createCategoryServices = async (data)=>{
    
    const{categoryName, categoryDesc, image, createdBy}  = data
     
    if(!categoryName || !categoryDesc || !image ){
        throw createError('all fields must be not be empty!', 400)
    }

      if(!image.url){
        throw createError('image is requires!', 400)
    }

   const existingCategory  = await Category.findOne({categoryName})

   if(existingCategory){
       throw createError('Category has already exists', 409)
   }

   const category = new Category({
       categoryName,
       categoryDesc,
       image,
       createdBy
   })

    await category.save()


     return category
    
    
}

const getAllCategoryServices = async (data)=>{

    const category = await Category.find({})

    if(category.length > 0){
        throw createError('Category not found!', 404)
    }

    return category;

}


const getCategoryByIdService = async(categoryId)=>{
   if(!categoryId){
      throw createError('No Category id provided!', 400)
   }

   const category = await Category.findById(categoryId)

   if(!category){
       throw createError('No category with such id found!', 404)
   }

   return category


}

module.exports = {
    createCategoryServices,
    getAllCategoryServices,
    getCategoryByIdService
}