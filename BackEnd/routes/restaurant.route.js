const controller = require('../app/controller/restaurant.controller')
const router = require('express').Router();
const {auth} = require('../app/middleware/auth.middleware');
const { uploadRestaurant } = require('../app/middleware/uploadImage');

router.get('/',controller.showAll )
router.post('/add',auth,uploadRestaurant.single('image'),controller.add )
router.get('/:id',auth,controller.showSingle )
router.patch('/:id',auth,uploadRestaurant.single('image'),controller.edit )
router.get('/products/:id',controller.restaurantProducts )
router.get('/orders/:id',auth,controller.restaurantOrders )




module.exports=router