const jwt = require('jsonwebtoken');
const userModel = require('../../database/models/user.model');
const { resData } = require('../helper');
const auth = async(req,res,next)=>{
   try{
    if(req.header("Authorization")){
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const userData = await userModel.findOne({
        _id:decoded._id,
        "tokens.token":token
    })
    req.token=token
    req.user = userData
    req.userType=userData.userType
}
else{
        req.token=""
        req.user = {}
        req.userType="Visitor"
    }
    next()
   }
   catch(e){
    resData(res,500,false,e.message,"unauthorized")
   }
}
const authAdmen = async(req,res,next)=>{
    try{
     const token = req.header("Authorization").replace("Bearer ", "");
     const decoded = jwt.verify(token,process.env.JWT_SECRET);
     const userData = await userModel.findOne({
         _id:decoded._id,
         userType:"Admen",
         "tokens.token":token
     })
     if(!userData) throw new Error("Invalid token")
     req.token=token
     req.user = userData
     console.log(decoded)
     next()
    }
    catch(e){
     resData(res,500,false,e.message,"unauthorized")
    }
 }
module.exports={
    auth,
    authAdmen
}