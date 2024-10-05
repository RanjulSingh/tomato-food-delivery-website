import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next)=>{
   const {token} = req.headers;
   if(!token)
   {
    return res.json({success: false,message:"Not authorized Login again"})
   }
   try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);//token will be decoded
        req.body.userId= token_decode.id;
        next();

   }catch(error)
   {
        console.log(error)
        req.json({successs:false,message: error})

   }
}

export default authMiddleware;
//this middleware take the token and convert it using user Id and using this userid we can addd , remove the data in the cart