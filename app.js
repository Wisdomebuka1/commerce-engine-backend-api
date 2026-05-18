const express = require('express')
const app = express()
const cors = require('cors');

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productsRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const orderRoutes = require('./routes/orderRoutes')


//// This allows Express to read JSON data from incoming requests(middlewre)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//auths endpoints
app.use('/api/v1/auth', authRoutes)

//product endpoints
app.use('/api/v1/product', productRoutes)

//category endpoints
app.use('/api/v1/category', categoryRoutes)

//order endpoints
app.use('/api/v1/order', orderRoutes)


app.listen(process.env.PORT, ()=>{
     console.log(`listening to port:${process.env.PORT}`)
})


module.exports = {app}
