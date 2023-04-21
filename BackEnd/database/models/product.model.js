const mongoose = require('mongoose')

const productSchema =mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restaurant'
    },
    ownerName:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
        // maxLength: 20,
        lowercase:true,

    },
image:{
                type:String,
                // required:true,
                trim:true,
                default: 'https://www.teenaagnel.com/wp-content/uploads/2019/12/food-photography-in-dubai.jpg'

            },
    title:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    content:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

},{
    timestamps:true
})

// taskSchema.methods.toJSON = function(){
//     const data = this.toObject()
//     delete data.__v
//     return data
// }
// taskSchema.pre('save',async function(){
//     if(this.taskType == 'txt' && this.file) this.file=""
//     else if(this.taskType == 'file' && this.content) this.content = ""

// })
const productModel = mongoose.model('product',productSchema)
module.exports = productModel