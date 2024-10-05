import mongoose from "mongoose"

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://greatstack:Ranjul123@cluster2.snlsp.mongodb.net/food-del')
    .then(()=>console.log("DB connected"));

}