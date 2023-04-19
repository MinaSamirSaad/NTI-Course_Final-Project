const router = require('express').Router();
const controller = require('../app/controller/admen.controller')
const {uploadAdmen} = require('../app/middleware/uploadImage')
const {authAdmen} = require('../app/middleware/auth.middleware')
// router.post('/add', auth,task.add);
// router.get('/', auth,task.showAll);
// router.get('/single/:id', auth,task.showSingle);
// router.patch('/edit/:id', auth,task.edit);

// post method
router.post('/register',controller.register )
router.post('/login',controller.logInUser )
router.post('/logout',authAdmen,controller.logOutUser )
router.post('/logoutAll',authAdmen,controller.logOutAll )

// update method
router.patch('/edit',authAdmen,uploadAdmen.single("img"),controller.edit )

// get methods
router.get('/users',authAdmen,controller.allUsers )
router.get('/users/:id',authAdmen,controller.getUserById )
router.get('/products',authAdmen,controller.allProducts )
router.get('/products/:id',authAdmen,controller.getProductById )
router.get('/orders',authAdmen,controller.allOrders )
router.get('/orders/:id',authAdmen,controller.getOrderById )
router.get('/restaurants',authAdmen,controller.allRestaurant )
router.get('/restaurants/:id',authAdmen,controller.getRestaurantById )

// delete methods
router.delete('/users',authAdmen,controller.delAllUsers )
router.delete('/users/:id',authAdmen,controller.delUserById )
router.delete('/products',authAdmen,controller.delAllProducts )
router.delete('/products/:id',authAdmen,controller.delProductById )
router.delete('/orders',authAdmen,controller.delAllOrders )
router.delete('/orders/:id',authAdmen,controller.delOrderById )
router.delete('/restaurants',authAdmen,controller.delAllRestaurant )
router.delete('/restaurants/:id',authAdmen,controller.delRestaurantById )

// router.patch('/single/:id',controller.editUserById )



module.exports=router