const multer  = require('multer')
const uploadAdmen = multer({ dest: 'public/admen' })
const uploadUser = multer({ dest: 'public/users' })
const uploadProduct = multer({ dest: 'public/products' })
const uploadRestaurant = multer({ dest: 'public/restaurants' })


module.exports={
    uploadAdmen,
    uploadProduct,
    uploadRestaurant,
    uploadUser
}