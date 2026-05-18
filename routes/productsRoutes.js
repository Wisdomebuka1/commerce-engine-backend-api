const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const imageUploadMiddleware = require('../middleware/imageUploadMiddleware')
const {createProductController, getAllProductController, getProductByIdController, updateProductController, deleteProductController } = require('../controllers/productController')


router.post('/', authMiddleware, imageUploadMiddleware,  createProductController)
router.get('/all-products', getAllProductController)
router.get('/get-products/:id', getProductByIdController)
router.put('/update-products/:id', updateProductController)
router.delete('/delete-products/:id', deleteProductController)


module.exports = router;