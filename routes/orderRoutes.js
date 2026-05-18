const {createOrderController, getAllOrderController, getOrderByIdController,updateOrderController} = require('../controllers/orderController')
const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, createOrderController)
router.get('/get-all', authMiddleware, getAllOrderController)
router.get('/:id', authMiddleware, getOrderByIdController)
router.put('/update-order/:id', authMiddleware, updateOrderController)

module.exports = router




