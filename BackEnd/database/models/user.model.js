const validator = require('validator')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const restaurantModel = require('./restaurant.model');
const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
        lowercase:true,

    },
    email:{
        type:String,
        required:true,
        trim:true,
        uniq:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
        
    },
    age:{
        type:Number,
        required:true,
        trim:true,
        min:18,
        max:60
    },
    status:{
        type:Boolean,
        default:false,
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        enum:['Male','Female']
    },
    address:{
        city:{
            type:String,
            trim:true,
            maxLength: 20,
        lowercase:true,
        },
        country:{
            type:String,
            trim:true,
            maxLength: 50,
        lowercase:true,

        }
    }
    ,
    phone:{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Invalid phone number');
            }
        }
    },
    dofBirth:{
        type:Date,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        // match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,

    },
    tokens:[{
        token:{
            type:String
        }
    }
    ],
    image:{
        type:String,
        default:'https://static.storyweaver.org.in/illustrations/48563/large/unknown-clip-art-4.jpg'
    },
    userType:{
        type:String,
        enum:["Visitor","User","Owner","Admen"]
    },
    products:[{
        productId:{
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
    ],
restaurant:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'restaurant'
}
},{
    timestamps:true
})
// userSchema.methods.toJSON = function(){
//     const data = this.toObject()
//     delete data.__v
//     delete data.password
//     delete data.tokens
//     return data
// }
userSchema.virtual("myOrders",{
    ref:"order",
    localField:"_id",
    foreignField:"userId"
})
userSchema.virtual("myProducts",{
    ref:"product",
    localField:"_id",
    foreignField:"userId"
})
userSchema.virtual("myRestaurant",{
    ref:"restaurant",
    localField:"_id",
    foreignField:"userId"
})
userSchema.pre("findByIdAndDelete", async function(){
    await restaurantModel.remove({userId:this._id})
})
userSchema.pre("save", async function(){
    if(this.isModified("password"))
    this.password = await bcrypt.hash(this.password,12)
})
userSchema.statics.loginMe=async (email,password)=>{
    const user = await userModel.findOne({email:email})
    if(!user) throw new Error("invalid email")
    const match = await bcrypt.compare(password,user.password)
    if(!match) throw new Error("invalid password")
   return user
}
userSchema.methods.generateToken= async function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
    // this.tokens.push({token})
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}
const userModel = mongoose.model('user',userSchema)

module.exports = userModel