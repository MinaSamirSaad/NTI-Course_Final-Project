const controller = require('../app/controller/product.controller')
const router = require('express').Router();
const {auth} = require('../app/middleware/auth.middleware')

router.get('/',controller.showAll )
router.get('/:id',controller.showSingle )
router.post('/add',auth,controller.add )
router.patch('/:id',auth,controller.edit )
router.delete('/:id',auth,controller.delete )

module.exports=router