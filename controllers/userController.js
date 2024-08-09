const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');


dotenv.config();
const secretKey=process.env.WhoIsThis
const userRegister=async(req,res)=>{
    try{
        const{userName,email,password}=req.body;
        const user=await User.findOne({email});
        if(user)
        {
            return res.status(401).json({message:'email taken'})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newuser=new User({
            userName,
            email,
            password:hashedPassword
        })
         
        await newuser.save();
        res.status(200).json({message:"Registeration Successful"})

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:'Internal error of registeration'})
    }
}

const userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password)))
        {
            return res.status(401).json({message:'Invalid Credentials'})
        }
        const token=jwt.sign({userId:user._id},secretKey,{expiresIn:"1h"})
        const userId=user._id;
        res.status(200).json({ success: "Login successful", token, userId })
        console.log(email);
        
    } catch (error) {
        return res.status(500).json({message:"Internal error of Login"})
    }
}

module.exports={userRegister,userLogin}