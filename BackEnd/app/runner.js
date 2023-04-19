const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
app.use(cors())
app.use(express.static(path.join(__dirname,"../public/")))
require('../database/connection')
const userRoutes = require('../routes/user.route')
const productsRoutes = require('../routes/products.route')
const ordersRoutes = require('../routes/orders.route')
const restaurantRoutes = require('../routes/restaurant.route')
const admenRoutes = require('../routes/Admen.route')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/user',userRoutes)
app.use('/api/products',productsRoutes)
app.use('/api/orders',ordersRoutes)
app.use('/api/restaurant',restaurantRoutes)
app.use('/api/Admen',admenRoutes)

app.all("*",(req,res)=>{
    res.status(404).send({
        apiStatus:false,
        data:null,
        message:"route Not Found"
    })
})
module.exports=app