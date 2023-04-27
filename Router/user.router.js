const express=require("express");
const {UserModel}=require("../Model/user.model");
const {authentiation}=require("../Middleware/authentication.middleware")
require("dotenv").config();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const UserRouter=express.Router();
UserRouter.post("/register",async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
          return  res.status(400).send({msg:"Please Provied All Details to register"})
        }
        let user= await UserModel.find({email})
        if(user.length>0){
           return res.status(400).send({msg:"User is already registerd"})

        }
        bcrypt.hash(password,+process.env.soltRounds, async(err,hash_pass)=>{
            if(err){
                res.status(400).send({err})
            }else{
                let newUser= new UserModel({
                    email,
                    password:hash_pass
                })
                await newUser.save();
                res.status(201).send({msg:"User Registerd"})
            }
        })
        
    } catch (error) {
        res.status(404).send({msg:error})
    }
})
UserRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email ||!password){
           return res.status(400).send({msg:"Fill all details"})
        }
        let user= await UserModel.findOne({email});
        if(!user){
           return res.status(400).send({msg:"User Not Found"})
        }
        bcrypt.compare(password, user.password, async(err,result)=>{
            if(err){
              return  res.send({msg:err})
            }
            if(result){
                let token= jwt.sign({id:user._id},process.env.key);
               return res.status(201).send({msg:"User Login",token})
            }
        })
    } catch (error) {
        res.status(404).send({msg:error})
    }
})
UserRouter.get("/getProfile",authentiation, async(req,res)=>{
    try {
        let userid= req.body.userId;
        let userProfile= await UserModel.findOne({_id:userid});
        if(!userProfile){
          return  res.status(400).send({msg:"User Not Found"})
        }
        res.status(200).send(userProfile)
    } catch (error) {
        res.status(404).send({msg:error})
        
    }
})
UserRouter.patch("/getProfile",authentiation, async(req,res)=>{
    try {
        let userid= req.body.userId;
        let payload=req.body;
        let userProfile= await UserModel.findOne({_id:userid});
        if(!userProfile){
          return  res.status(400).send({msg:"User Not Found"})
        }
        await UserModel.findByIdAndUpdate({_id:userid},payload)
        res.status(201).send({mas:"User Profile Updated"})
    } catch (error) {
        res.status(404).send({msg:error})
        
    }
})
module.exports={
    UserRouter
}