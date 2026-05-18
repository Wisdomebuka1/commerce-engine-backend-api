const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const imageUploadMiddleware = require('../middleware/imageUploadMiddleware')
const {createCategoryController, getAllCategoryController} = require('../controllers/categoryController')

router.post('/', authMiddleware, imageUploadMiddleware, adminMiddleware, createCategoryController)
router.post('/all-category', authMiddleware,  getAllCategoryController)



module.exports = router;