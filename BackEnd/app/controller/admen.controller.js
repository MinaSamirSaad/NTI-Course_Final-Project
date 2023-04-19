const userModel = require('../../database/models/user.model')
const productModel = require('../../database/models/product.model')
const orderModel = require('../../database/models/order.model')
const restaurantModel = require('../../database/models/restaurant.model')
const helperFunc = require("../helper")
class User {
    static register=async(req,res)=>{
        try{
            const userData = await new userModel(req.body)
            await userData.save();
            helperFunc.resData(res,200,true,userData,"success adding")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed adding")
        }
    }

    static logInUser = async(req,res)=>{
        try{
            const user = await userModel.loginMe(req.body.email,req.body.password);
            await user.generateToken()
            helperFunc.resData(res,200,true,user,"success login")

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
    static logOutAll = async(req,res)=>{
        try{
            userModel.tokens=[]
            await userModel.save()
            helperFunc.resData(res,200,true,userModel.find(),"success logout")

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed logout")
        }
    }

    static edit = async(req,res)=>{
        try{
            const fs = require('fs')
            const ext = req.file.originalname.split(".").pop()
            const newName = req.file.path + "." + ext;
            fs.renameSync(req.file.path,newName)
            req.user={image :`${process.env.ServerLink}${req.file.filename}.${ext}`,...req.body}
           await req.user.save()
            helperFunc.resData(res,200,true,req.user,"success edit")

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed edit")
        }
    }

    static allUsers=async(req,res)=>{
        try{
            const users = await userModel.find()
            helperFunc.resData(res,200,true,users,"success get users")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed get")
        }
    }

    static getUserById=async(req,res)=>{
        try{
            const user = await userModel.findById(req.params.id)
            if(user){
                helperFunc.resData(res,200,true,user,"success getting")
            }else{
                throw new Error("Couldn't find user")
            }
            

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed getting")
        }
    }

    static delUserById=async(req,res)=>{
        try{
            const user = await userModel.findByIdAndDelete(req.params.id)
            // await taskModel.deleteMany({userId:req.params.id})
            helperFunc.resData(res,200,true,user.id,"success deleting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }

    static delAllUsers=async(req,res)=>{
        try{
            await userModel.deleteMany({})
            helperFunc.resData(res,200,true,{},"success deleting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }

    static myTasks = async(req,res)=>{
        try{
            await req.user.populate("myTasks")
            helperFunc.resData(res,200,true,req.user.myTasks,"success logout")

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed logout")
        }
    }

    static allProducts = async(req,res)=>{
        try{
            const products = await productModel.find()
            helperFunc.resData(res,200,true,products,"success get products")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed get")
        }
    }
    static getProductById=async(req,res)=>{
        try{
            const product = await productModel.findById(req.params.id)
            if(product){
                helperFunc.resData(res,200,true,product,"success getting")
            }else{
                throw new Error("Couldn't find product")
            }
            

        }
        
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed getting")
        }
    }
    static delAllProducts=async(req,res)=>{
        try{
            await productModel.deleteMany({})
            helperFunc.resData(res,200,true,{},"success deleting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }
    static delProductById=async(req,res)=>{
        try{
            await productModel.findByIdAndDelete(req.params.id)
            // await taskModel.deleteMany({userId:req.params.id})
            helperFunc.resData(res,200,true,{},"success deleting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }
    static allOrders = async(req,res)=>{
        try{
            const orders = await orderModel.find()
            helperFunc.resData(res,200,true,orders,"success get orders")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed get")
        }
    }
    static getOrderById=async(req,res)=>{
        try{
            const order = await orderModel.findById(req.params.id)
            if(order){
                helperFunc.resData(res,200,true,order,"success getting")
            }else{
                throw new Error("Couldn't find order")
            }
            

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed getting")
        }
    }
    static delAllOrders=async(req,res)=>{
        try{
            await orderModel.deleteMany({})
            helperFunc.resData(res,200,true,{},"success deleting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }
    static delOrderById=async(req,res)=>{
        try{
            await orderModel.findByIdAndDelete(req.params.id)
            // await taskModel.deleteMany({userId:req.params.id})
            helperFunc.resData(res,200,true,{},"success deleting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }
    static allRestaurant = async(req,res)=>{
        try{
            const restaurants = await restaurantModel.find()
            helperFunc.resData(res,200,true,restaurants,"success get restaurants")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed get")
        }
    }
    static getRestaurantById=async(req,res)=>{
        try{
            const restaurant = await restaurantModel.findById(req.params.id)
            if(restaurant){
                helperFunc.resData(res,200,true,restaurant,"success getting")
            }else{
                throw new Error("Couldn't find user")
            }
            

        }
        catch(e){
            helperFunc.resData(res,500,false,e.message,"failed getting restaurant")
        }
    }
    static delAllRestaurant=async(req,res)=>{
        try{
            await restaurantModel.deleteMany({})
            helperFunc.resData(res,200,true,{},"success deleting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }
    static delRestaurantById=async(req,res)=>{
        try{
            await restaurantModel.findByIdAndDelete(req.params.id)
            // await taskModel.deleteMany({userId:req.params.id})
            helperFunc.resData(res,200,true,{},"success deleting")

        }
        catch(e){
            helperFunc.resData(res,500,false,e,"failed deleting")
        }
    }
}
module.exports = User