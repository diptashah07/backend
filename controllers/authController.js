const User = require('../models/user');
const jwt =require('jsonwebtoken');

//Generate JWT token
// const generateToken=(id)=> {
//     return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"1h"});
// };
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, tenantId: user.tenantId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};



//Register user
exports.registerUser = async (req,res)=>{
    console.log("Received body:", req.body);
    const { fullName,email,password,profileImageUrl,Role="Admin"}= req.body || {};

    //validation:check for missing fields
    if(!fullName || !email || !password ) {
        return res.status(400).json({message:"All fields sre required"});
    }

    try{
        //check if email already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Emaill already in use"});
        }

        //create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
            Role
        });

        res.status(201).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });
    }   catch(err){
        res
          .status(500)
          .json({message:"Error registrating user", error: err.message});
    }
};

//Login User
exports.loginUser = async (req,res)=>{
    const{email,password}=req.body ||{};
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const user =await User.findOne({email});
        if (!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:"Invalids credentials"});
            
        }

         res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });
    }  catch(err){
        res
          .status(500)
          .json({message:"Error registrating user", error: err.message});
    }
};

//Register User
exports.getUserInfo = async (req,res)=>{
    try{
        const user= await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (err){
        res
          .status(500)
          .json({message:"Error registrating user", error:err.message});
    }
};