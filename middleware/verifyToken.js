const jwt=require('jsonwebtoken');
const User=require('../models/User');
const dotenv=require('dotenv')


dotenv.config();
const secretKey=process.env.WhoIsThis
const verifyToken=async(req,res,next)=>{
    try {
        const token=req.headers.token;
        if(!token)
        {
            return res.status(400).json({message:'token not found'})
        }
        let decode=jwt.verify(token,secretKey);
        let user=await User.findById(decode.userId)
        if(!user)
        {
            return res.status(401).json({message:'user not found'})
        }
        req.userId = user._id;
        next();

        
    } catch (error) {
        return res.status(500).json({message:"Internal error in verifying token"})
    }
}

module.exports=verifyToken