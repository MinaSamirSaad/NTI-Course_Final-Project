const orderModel = require('../../database/models/order.model');
const productModel = require('../../database/models/product.model');
const { resData } = require('../helper');
class Order{
    static add =async(req,res)=>{
        try{
            if(req.userType == "Visitor") throw new Error("you should register first")
        const orderData = await new orderModel({
            'userId':req.user._id,
            'userName':req.user.userName,
            'productId':req.params.id,
            ...req.body})
            req.user.orders.push(orderData._id)
        await orderData.save();
        await req.user.save()
        resData(res, 200,true,orderData,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static showSingle =async(req,res)=>{
        try{
        const order = await orderModel.findById(req.params.id)
        if(req.userType != "Visitor" || JSON.stringify(order.userId)!=JSON.stringify(req.user._id) ) throw new Error("you should register first")
        await order.populate("orderData")
        const data = {
            orderData:order.orderData[0],
            numberOfItems:order.itemsNumber
        }
        resData(res, 200,true,data,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static edit =async(req,res)=>{
        try{
        const order = await orderModel.findById(req.params.id)
        if(req.userType != "Visitor" || JSON.stringify(order.userId)!=JSON.stringify(req.user._id) ) throw new Error("you should register first")
            order.itemsNumber = req.body.itemsNumber
        await order.save()
        resData(res, 200,true,order,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static delete =async(req,res)=>{
        try{
        const order = await orderModel.findById(req.params.id)
        // if(req.userType != "Visitor"  ) throw new Error("you should register first")
        req.user.orders =req.user.orders.filter((or)=>{
            return JSON.stringify(or._id) !=JSON.stringify(order._id)
        })
        await req.user.save()
        await order.deleteOne()
        resData(res, 200,true,{},"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
}
module.exports=Order