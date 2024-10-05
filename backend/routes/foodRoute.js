import express from "express"
import {addFood,listFood,removeFood} from "../controllers/foodControllers.js"
import multer from "multer"

const foodRouter = express.Router();

//Image storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(request,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)//whenever we will upload one file our timestamp will be added in the file original name and it will create a unique name and that file will be stored in the upload folder 
         
    }
})

const upload = multer({storage:storage})//using this we store the image in the uploads folder

foodRouter.post("/add",upload.single("image"),addFood)//to send data on the server and we will get response
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)



export default foodRouter;
