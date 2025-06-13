// auth.js (middleware)
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

//middleware to protect routes
export const protectRoute=async(req,res,next)=>{
    try{
        const token=req.headers.token; 

        if (!token) {
            return res.json({success:false,message:"Unauthorized access: No token provided"});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        req.user=user;
        next();
    }catch(e){
        console.log("User unauthorized (protectRoute error):", e.message); 
        return res.json({success:false,message:"Unauthorized access"});
    }
}