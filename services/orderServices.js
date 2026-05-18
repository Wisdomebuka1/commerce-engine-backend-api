
const Order = require("../models/Order");
const Product = require("../models/Products");
const { createError } = require("../utils/createErrors");

/**
 * CREATE ORDER SERVICE
 * Handles full order creation logic:
 * - validate products
 * - check stock
 * - calculate total
 * - reduce inventory
 * - save order
 */
const createOrderService = async (userId, product) => {

   // Validate that products exist and array is not empty
   if (!product || product.length === 0) {
      throw createError(
         "No products provided", // error message
         400 // HTTP status code (Bad Request)
      );
   }

   // Temporary storage for processed order items
   let orderItems = [];

   // Tracks total order cost
   let totalAmount = 0;



   // Loop through each product in the order request
   for (const item of product) {

    if (!item || !item.productId) {
      throw createError("Invalid product format", 400);
   }


      // Find product in database using its ID
      const product = await Product.findById(
         item.productId
      );

      // If product doesn't exist, throw error
      if (!product) {
         throw createError(
            "Product not found",
            404 // Not Found
         );
      }

      // Check if stock is enough for requested quantity
      if (product.quantity < item.quantity) {
         throw createError(
            `${product.productName} is out of stock`,
            400
         );
      }

      // Calculate cost for this item (price × quantity)
      const subtotal =
         product.price * item.quantity;

      // Add subtotal to total order amount
      totalAmount += subtotal;



      // Push formatted item into orderItems array
      orderItems.push({

         product: product._id, // store product reference (ID)

         quantity: item.quantity, // how many units ordered

         price: product.price, // snapshot of price at time of order

      });



      // Reduce product stock in database memory
      product.quantity -= item.quantity;

      // Save updated product stock to database
      await product.save();
   }



   // Create final order document in database
   const order = await Order.create({

      user: userId, // who made the order

      orderItems, // list of items in cart

      totalAmount // final calculated total

   });

   // Return created order to controller
   return order;
};


const getAllOrderService = async()=>{
     const order = await Order.find({}).populate('user', 'username email').populate('orderItems.product');

     if(order.length === 0){
       throw createError('No order found!', 404)
     }
     return order 
}


const getOrderByIdService = async(orderId)=>{

   if(!orderId ){
       throw createError('No order id provided', 400)
   }

   const order = await Order.findById(orderId).populate('user', '-password').populate('orderItems.product', 'productName price image').lean()

    if(!order){
      throw createError('Order not found!', 404)
    }


   return order

}


const updateOrderService = async(orderId, data)=>{

   if(!orderId || !data){
       throw createError('No update data provided!', 400)
   }

   const updatedOrder = await Order.findByIdAndUpdate(orderId, data, {returnDocument: true}).populate('user', '-password').populate('orderItems.product', 'productName price iamge')

   if(!updatedOrder){
      throw createError('order not found!', 404)
   }


   return updatedOrder;
}



const deleteOrderService = async (
   orderId
) => {

   // Validate orderId
   if (!orderId) {
      throw createError(
         "No order id provided",
         400
      );
   }

   // Delete order from database
   const deletedOrder =
      await Order.findByIdAndDelete(
         orderId
      );

   // If deletion failed (order not found)
   if (!deletedOrder) {
      throw createError(
         "Order not deleted",
         404
      );
   }

   // Return deleted order (optional for logs/audit)
   return deletedOrder;
};




module.exports = {
    createOrderService,
    getAllOrderService,
    getOrderByIdService,
    updateOrderService,
    deleteOrderService
}





