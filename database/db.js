const mongoose = require('mongoose')
const databaseConnection = async()=>{
      try{
         
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connetion successfully!')
      }catch(error){
        console.log('Database connection failed', error);
        process.exit(1)
         
      }
}

module.exports = {databaseConnection}