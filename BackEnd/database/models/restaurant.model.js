const mongoose = require('mongoose')

const restaurantSchema =mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
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
        required:true,
        trim:true,
        default: 'https://www.teenaagnel.com/wp-content/uploads/2019/12/food-photography-in-dubai.jpg'

    },
    title:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        uniq:true,
    },
    details:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    products:[{
        product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'product'

        }
    }
    ],
    orders:[{
        order:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'order'

        }
    }
    ]
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
restaurantSchema.virtual("resOrders",{
    ref:"order",
    localField:"userId",
    foreignField:"userId"
})
restaurantSchema.virtual("resProducts",{
    ref:"product",
    localField:"userId",
    foreignField:"userId"
})
const restaurantModel = mongoose.model('restaurant',restaurantSchema)
module.exports = restaurantModel