const {createOrderService, getAllOrderService, getOrderByIdService, updateOrderService, deleteOrderService} = require('../services/orderServices')
const createOrderController = async(req,  res)=>{
    try{

       const userId = req.user.userId
       
       
       const product = Array.isArray(req.body) ? req.body : [req.body];

       const order = await createOrderService(userId, product)

       return res.status(201).json({
          success: true,
          message: `order was  created successfully`,
          data: order
       })

    }catch(error){
      console.log(error)
      return res.status(error.statusCode ||500).json({
         success: false,
         message: error.message,
      })
    }
}

const getAllOrderController = async(req, res)=>{
    try{
       const order = await getAllOrderService();

       return res.status(200).json({
          success: true,
          message: 'fetch all order successfully!',
          data: order
       })

       
    }catch(error){
      console.log(error)
      res.status(error.statusCode || 500).json({
         success: false,
         message: error.message
      })
    }
}

const getOrderByIdController = async(req, res)=>{
    
    try{
        
     const orderId = req.params.id
     const order =  await getOrderByIdService(orderId)

     return res.status(200).json({
        success: true,
        message: 'Order fetched by id successfully!',
        data: order
     })

    }catch(error){
        console.log(error)
        res.status(error.statusCode || 500).json({
           success: false,
           message: error.message
        })
    }


}

const updateOrderController = async(req, res)=>{
    try{
        const orderId = req.params.id;
        const data = req.body;

        const updateOrder = await updateOrderService(orderId, data)

        return res.status(200).json({
          success: true, 
          message: 'order updated successfully!',
          data: updateOrder
        })




    }catch(error){
      console.log(error)

      return res.status(error.statusCode || 500).json({
         success: false,
         message: error.message
         
      })
    }
   
}

const deleteOrderController = async(req, res)=>{
   
}





module.exports = {
   createOrderController,
   getAllOrderController, 
   getOrderByIdController,
   updateOrderController
}