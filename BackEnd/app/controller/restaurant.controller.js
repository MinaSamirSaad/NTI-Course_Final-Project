const restaurantModel = require('../../database/models/restaurant.model');
const { resData } = require('../helper');

class Restaurant{
    static add =async(req,res)=>{
        try{
            // if(req.userType != "Owner") throw new Error("you are not restaurant owner")
            const fs = require('fs')
            console.log(req.file)
            const ext = req.file.originalname.split(".").pop()
            const folderName = req.file.path.split("/")[1]
            const newName = req.file.path + "." + ext;
            fs.renameSync(req.file.path,newName)
        const restaurantData = await new restaurantModel({
            userId:req.user._id,
            ownerName:req.user.userName,
            image:`${process.env.ServerLink}${folderName}/${req.file.filename}.${ext}`,
            ...req.body})
        await restaurantData.save();
        req.user.restaurant = restaurantData._id;
        await req.user.save()
        resData(res, 200,true,restaurantData,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static showAll =async(req,res)=>{
        try{
        const restaurants = await restaurantModel.find()
        resData(res, 200,true,restaurants,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static showSingle =async(req,res)=>{
        try{
        const restaurant = await restaurantModel.findById(req.params.id)
        resData(res, 200,true,restaurant,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }

    static edit =async(req,res)=>{
        try{
        const restaurant = await restaurantModel.findById(req.params.id)
        // if(req.userType != "Owner"|| JSON.stringify(restaurant.userId)!=JSON.stringify(req.user._id)  ) throw new Error("you are not restaurant owner")
        // if(req.body.userName || req.body.userId) throw new Error("can not edit the Owner details")
        const fs = require('fs')
        console.log(req.file)
        if(req.file){
        const ext = req.file.originalname.split(".").pop()
        const folderName = req.file.path.split("/")[1]
        const newName = req.file.path + "." + ext;
        fs.renameSync(req.file.path,newName)
        restaurant.image=`${process.env.ServerLink}${folderName}/${req.file.filename}.${ext}`  ;
        }
        for (let key in req.body) {
            restaurant[key] = req.body[key]
        }
        await restaurant.save()
        resData(res, 200,true,restaurant,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static restaurantProducts = async(req,res)=>{
        try{
        const restaurant = await restaurantModel.findById(req.params.id)
            await restaurant.populate("resProducts")
            resData(res,200,true,restaurant.resProducts,"success getting")
        }
        catch(e){
            resData(res,500,false,e.message,"failed getting")
        }
    }
    static restaurantOrders = async(req,res)=>{
        try{
            const restaurant = await restaurantModel.findById(req.params.id)
            if(!req.userType!="Owner" || JSON.stringify(restaurant.userId)!=JSON.stringify(req.user._id) ) throw new Error("you are not restaurant owner")
           await restaurant.populate("resOrders")
            resData(res,200,true,restaurant.resOrders,"success getting")

        }
        catch(e){
            resData(res,500,false,e.message,"failed getting")
        }
    }
    // static uploadImage = async(req,res)=>{
    //     try{
    //         const fs = require('fs')
    //         const ext = req.file.originalname.split(".").pop()
    //         const newName = req.file.path + "." + ext;
    //         fs.renameSync(req.file.path,newName)
    //         req.user.image =`${process.env.ServerLink}${req.file.filename}.${ext}`
    //        await req.user.save()
    //         helperFunc.resData(res,200,true,req.user,"success upload")

    //     }
    //     catch(e){
    //         helperFunc.resData(res,500,false,e.message,"failed upload")
    //     }
    // }
}
module.exports=Restaurant