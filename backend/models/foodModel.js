import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        reqquired: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
         required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);//but we can create the only once but when we run this file again it will created again that's why applied OR

export default foodModel;