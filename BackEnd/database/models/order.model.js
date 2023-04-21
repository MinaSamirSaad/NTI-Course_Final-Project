const mongoose = require('mongoose')

const orderSchema =mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restaurant'
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
        // maxLength: 20,
        lowercase:true,

    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'product'
    },
    // itemsNumber:{
    //     type:Number,
    //     required:true
    // }
},{
    timestamps:true
})
orderSchema.virtual("orderData",{
    ref:"product",
    localField:"productId",
    foreignField:"_id"
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
const orderModel = mongoose.model('order',orderSchema)
module.exports = orderModel