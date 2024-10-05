import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async(req,res)=>{
const {email,password} = req.body;
try{
const user = await userModel.findOne({email});
if(!user)
{
    return res.json({success:false,message:"user does not exist"})
}

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
    return res.json({success:false,message:"Invalid credentials"})//if password is not matching
}

//if password is matching we will generate one token
const token = createToken(user._id)
res.json({success:true,token})
}

catch(error)
{
console.log(error)
res.json({success:false,message: "Error"})
}
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async(req,res)=>{
const {name,password,email} =req.body;
try{

    //checking if user already exist
const exists = await userModel.findOne({email})
if(exists)
{
    return res.json({success:false,message:"User already exists"})
}


//validating email format and strong password
if(!validator.isEmail(email))
    {//if user email is not valid
return res.json({success:false,message:"please enter valoid email"})
}

if(password.length<8)
{
    return res.json({success:false,message:"please enter strong password"})

}

//hashing user password
const salt = await bcrypt.genSalt(10)//it will create the strongest password acording to the number
const hashedPassword = await bcrypt.hash(password,salt)//password has been hashed

const newUser = new userModel({//create new user
    name: name,
    email: email,
    password: hashedPassword
})

const user = await newUser.save()//store the user in the database and then create one token
const token = createToken(user._id)
res.json({success: true,token})


}catch(error)
{

console.log(error);
res.json({success: faalse,message: "error"})

}

}
export {loginUser,registerUser}
