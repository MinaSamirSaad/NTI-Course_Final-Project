const controller = require('../app/controller/product.controller');
const router = require('express').Router();
const {auth} = require('../app/middleware/auth.middleware');
const { uploadProduct } = require('../app/middleware/uploadImage');

router.get('/',controller.showAll )
router.get('/:id',controller.showSingle )
router.post('/add',auth,uploadProduct.single('image'),controller.add )
router.patch('/:id',auth,uploadProduct.single('image'), controller.edit )
router.delete('/:id',auth,controller.delete )

module.exports=router