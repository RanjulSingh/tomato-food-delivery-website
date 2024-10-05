import foodModel from "../models/foodModel.js"
import fs from 'fs' //file system prebilt in node js

//add food item

const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`//store name of the image

    const food = new foodModel({
        name:req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })//whenever we will hit addFood API we will all details to body and access it in the backend

    try{
        await food.save();
        res.json({success:true,message:"Food Added"})//if no error then this message 

    } catch(error)
    {
        console.log(error)
        res.json({success:false, message: "Error"})//if error then this message
    }

} 

//all food list

const listFood = async (req,res) => {
try{
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
}
catch(error){
    console.log(error)
    res.json({success:false,message:"Error"})

}
}

//remove food item
const removeFood = async (req,res)=>{
try{
const food = await foodModel.findById(req.body.id);
fs.unlink(`uploads/${food.image}`,()=>{})//this image will be deleted from folder

await foodModel.findByIdAndDelete(req.body.id);//delete the product data drom the mongodb database
res.json({success:true,message:"Food removed"});
}catch(error){
console.log(error)
res.json({success:false,message:"Error"})
}
}
export {addFood,listFood,removeFood}