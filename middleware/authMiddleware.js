const jwt = require('jsonwebtoken')

const authMiddleware = async(req, res, next)=>{

   //1. gets the authentication header
   const authHeader = req.headers.authorization;

   //2. check wether authHeader is present and extract the token 
   const token = authHeader && authHeader.split(' ')[1]

   // console.log(token)
   
   if(!token){
      return res.status(401).json({
        success: false,
        message: 'Access denied, No token provided please login to continue'
      })
   }

   try{
      
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decode;
    next()

   }catch(error){
    console.log(error)
    res.status(401).json({
        success: false,
        message: 'invalid token' 
    })
     
   }


}



module.exports = authMiddleware