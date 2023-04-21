const productModel = require('../../database/models/product.model');
const { resData } = require('../helper');
class Product{
    static add =async(req,res)=>{
        try{
            if(req.userType != "Owner") throw new Error("you are not restaurant owner")
            const fs = require('fs')
            console.log(req.file)
            const ext = req.file.originalname.split(".").pop()
            const folderName = req.file.path.split("/")[1]
            const newName = req.file.path + "." + ext;
            fs.renameSync(req.file.path,newName)
        const productData = await new productModel({
            'userId':req.user._id,
            'ownerName':req.user.userName,
            'image':`${process.env.ServerLink}${folderName}/${req.file.filename}.${ext}`,
            ...req.body})
        await req.user.products.push(productData._id)
        await productData.save();
        await req.user.save()
        resData(res, 200,true,productData,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static showAll =async(req,res)=>{
        try{
        const products = await productModel.find()
        resData(res, 200,true,products,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static showSingle =async(req,res)=>{
        try{
        const product = await productModel.findById(req.params.id)
        resData(res, 200,true,product,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static edit =async(req,res)=>{
        try{
            if(req.userType != "Owner" ) throw new Error("you are not restaurant owner")
        const product = await productModel.findById(req.params.id)
        const fs = require('fs')
        console.log(req.file)
        if(req.file){
        const ext = req.file.originalname.split(".").pop()
        const folderName = req.file.path.split("/")[1]
        const newName = req.file.path + "." + ext;
        fs.renameSync(req.file.path,newName)
        if(JSON.stringify(product.userId) != JSON.stringify(req.user._id)) throw new Error("you are not product Owner")
        product.image=`${process.env.ServerLink}${folderName}/${req.file.filename}.${ext}`;
        }
        for (let key in req.body) {
            product[key] = req.body[key]
        }
        await product.save()
        resData(res, 200,true,product,"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
    static delete =async(req,res)=>{
        try{
            if(req.userType != "Owner" ) throw new Error("you are not restaurant owner")
        const product = await productModel.findById(req.params.id)
        if(JSON.stringify(product.userId) != JSON.stringify(req.user._id)) throw new Error("you are not product Owner")
        req.user.products =req.user.products.filter((pro)=>{
            return JSON.stringify(pro._id) !=JSON.stringify(product._id)
        })
        await req.user.save()
        await product.deleteOne()
        resData(res, 200,true,{},"success")
        }
        catch(e){
        resData(res, 500,false,e.message,"failure")
        }
    }
}
module.exports=Product