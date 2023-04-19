const controller = require('../app/controller/user.controller')
const router = require('express').Router();
const upload = require('../app/middleware/uploadImage')
const {auth} = require('../app/middleware/auth.middleware')
// post method
router.post('/register',controller.register )
router.post('/login',controller.logInUser )
router.post('/logout',auth,controller.logOutUser )
// router.post('/uploadImage',auth,upload('user'),controller.uploadImage )

// get method
router.get('/',auth,controller.userData )
router.get('/products',auth,controller.myProducts )
router.get('/orders',auth,controller.myOrders)
router.get('/restaurant',auth,controller.myRestaurant)


// delete method
router.delete('/',auth,controller.delUser )
// edit methods
router.patch('/',auth,controller.editUser )




module.exports=router