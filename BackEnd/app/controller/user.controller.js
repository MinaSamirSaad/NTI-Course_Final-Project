const userModel = require('../../database/models/user.model')
const helperFunc = require("../helper")
class User {
    static register=async(req,res)=>{
        try{
            if(req.body.userType =="Admen") throw new Error("you can not be Admen")
            const user = await new userModel(req.body)
            await user.save();
            const token =await user.generateToken()
            helperFunc.resData(res,200,true,{user,token},"success adding")

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed adding")
        }
    }

    static userData=async(req,res)=>{
        try{
            helperFunc.resData(res,200,true,req.user,"success get users")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed get")
        }
    }

    static logInUser = async(req,res)=>{
        try{
            const user = await userModel.loginMe(req.body.email,req.body.password);
            const token =await user.generateToken()
            helperFunc.resData(res,200,true,{user,token},"success login")

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed login")
        }
    }
    static logOutUser = async(req,res)=>{
        try{
            req.user.tokens=req.user.tokens.filter((tok)=>tok.token !=  req.token)
            await req.user.save()
            helperFunc.resData(res,200,true,req.user,"success logout")

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed logout")
        }
    }


    static delUser=async(req,res)=>{
        try{
            await userModel.findByIdAndDelete(req.user.id)
            // await taskModel.deleteMany({userId:req.params.id})
            helperFunc.resData(res,200,true,{},"success deleting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }


    static editUser=async(req,res)=>{
        if(req.body.userType =="Admen") throw new Error("you can not be Admen")
        try{
            for (let key in req.body) {
                if(key!="password"){
                req.user[key] = req.body[key]
                }
            }
            await req.user.save()
            helperFunc.resData(res,200,true,req.user,"success update")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }

    static myProducts = async(req,res)=>{
        try{
            if(req.userType !="Owner") throw new Error("you are not restaurant owner")
            await req.user.populate("myProducts")
            helperFunc.resData(res,200,true,req.user.myProducts,"success getting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed getting")
        }
    }
    static myOrders = async(req,res)=>{
        try{
            if(!req.userType=="User") throw new Error("you are not restaurant owner")
           await req.user.populate("myOrders")
            helperFunc.resData(res,200,true,req.user.myOrders,"success getting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed getting")
        }
    }
    static myRestaurant = async(req,res)=>{
        try{
            if(!req.userType=="Owner") throw new Error("you are not restaurant owner")
            await req.user.populate("myRestaurant")
            helperFunc.resData(res,200,true,req.user.myRestaurant,"success getting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed getting")
        }
    }
    static uploadImage = async(req,res)=>{
        try{
            const fs = require('fs')
            console.log(req.file)
            const ext = req.file.originalname.split(".").pop()
            const folderName = req.file.path.split("/")[1]
            const newName = req.file.path + "." + ext;
            fs.renameSync(req.file.path,newName)
            req.user.image =`${process.env.ServerLink}${folderName}/${req.file.filename}.${ext}`
           await req.user.save()
            helperFunc.resData(res,200,true,req.user,"success upload")
        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed upload")
        }
    }
}
module.exports = User