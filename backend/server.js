import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config

const app = express()
const port = 4000

//middleware = whenever we will get from request from frontend to backend that willl be parsed into json
app.use(express.json())
app.use(cors())//using this we can access the backend from any frontend

//db connection

connectDB();

//api endpoints

app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))//using this we can see image in frontend 
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)//after that if user send the item id using that id i can add one entry in thier cart , when user will send the data they will use the token to authenticate them to decode the token we will use the middleware and name it as auth.js 
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{//whenever we will hit this "/" (endpoint) we will get API WORKING
    res.send("APT WORKING")
})//http method to request the data from the server

//RUN THE EXPRESS SERVER

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})


//mongodb+srv://greatstack:Ranjul123@cluster2.snlsp.mongodb.net/?