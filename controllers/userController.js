import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
export const signUP=async(req,res)=>{

    try {
        const {name,email,password}=req.body;
        
        if(!email || !name ||!password){
            return res.send({   
                message:"Please fill all the required file",
                success:false
            })
        }

        const checkExitUser=await userModel.findOne({email})
        if(checkExitUser){
            return res.send({message:"User already exits",success:false})
        }

        const salt= await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)
     
        

        const newUser=new userModel({
            name,
            email,
            password:hashPassword
        })
        await newUser.save()
        // res.send({message:"User signin succsesfully",success:true,data:newUser})

             const token=await jwt.sign({_id:newUser._id},process.env.TOKEN_SECRET)
        console.log(token)
        if(!token){
         return   res.send({message:"token is not created",success:false})
        }

        return res.cookie("token",token,{
            httpOnly:true
        }).send({message:"User created succesfully",success:true})
        
  


    } catch (error) {
        console.log(error)
        return res.send({message:error.message,success:false})
    }
}


export const logIn=async(req,res)=>{
    try {
            const {email,password}=req.body;

        if(!email  ||!password){
            return res.send({   
                message:"Please fill all the required file",
                success:false
            })
        }

        const checkExitUser=await userModel.findOne({email})
        if(!checkExitUser){
            res.send({message:"User does not exit",success:false})
        }

        const checkPassword=await bcrypt.compare(password, checkExitUser.password)
        if(!checkPassword){
            res.send({message:"Password is incorrect",success:false})
        }

        const token=await jwt.sign({id:checkExitUser._id},process.env.TOKEN_SECRET)
            if(!token){
         return   res.send({message:"token is not created",success:false})
        }

        return res.cookie("token",token,{
            httpOnly:true
        }).send({message:"User login succesfully",success:true})
        

    } catch (error) {
         console.log(error)
        return res.send({message:error.message,success:false})
    }
}