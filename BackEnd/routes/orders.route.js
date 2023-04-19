const controller = require('../app/controller/order.controller')
const router = require('express').Router();
const {auth} = require('../app/middleware/auth.middleware')

router.get('/:id',auth,controller.showSingle )
router.post('/add/:id',auth,controller.add )
router.patch('/:id',auth,controller.edit )
router.delete('/:id',auth,controller.delete )

module.exports=router