const controller = require('../app/controller/restaurant.controller')
const router = require('express').Router();
const {auth} = require('../app/middleware/auth.middleware')

router.get('/',controller.showAll )
router.post('/add',auth,controller.add )
router.get('/:id',auth,controller.showSingle )
router.patch('/:id',auth,controller.edit )
router.get('products/:id',auth,controller.restaurantProducts )
router.get('orders/:id',auth,controller.restaurantOrders )




module.exports=router