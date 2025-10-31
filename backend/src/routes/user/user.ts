import express from "express";
import {z} from "zod";
import jwt from "jsonwebtoken";
import UserModel from "../../db.js";
import { authMiddleware } from "../../midlleware/authMiddleware.js";
import bcrypt from "bcrypt";
import type { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET as string;

const router = express.Router();

interface AuthRequest extends Request{
    userId?:string;
}

const signupSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

const signinSchema = z.object({
    username: z.string(),
    password: z.string(),
})

const updateBody = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional()
})

//User Signup
router.post("/signup", async (req,res)=>{
    const parsed = signupSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error: "Invalid Input"});
    }

    const {username,password,firstName,lastName} = parsed.data;

    try{
        const existingUser = await UserModel.findOne({username});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new UserModel({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });

        await newUser.save();

        const token = jwt.sign({id: newUser._id}, JWT_SECRET, {expiresIn: "1h"});
        res.json({message: "Signup successful",token});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
});

//User Signin
router.post("/signin",async (req,res)=>{
    const parsed = signinSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error: "Invalid input"});
    }

    const {username,password} = parsed.data;

    try{
        const user = await UserModel.findOne({username});
        if(!user){
            return res.status(401).json({message: "Invalid username"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid password"});
        }

        const token = jwt.sign({id:user._id},JWT_SECRET);
        res.json({message: "Signin successfull",token});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
});

//User Signout
router.post("/signout",(req,res)=>{
    res.json({message: "Signout successfull"});
})

//User Update
router.put("/update", authMiddleware, async (req: AuthRequest,res)=>{
    const parsed = updateBody.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({error: "Invalid Input"});
    }

    const {firstName, lastName, password} = parsed.data;

    try{
        const updateData: Record<string, any>={};
        if(firstName) updateData.firstName = firstName;
        if(lastName) updateData.lastName = lastName;
        if(password) updateData.password = await bcrypt.hash(password,10);

        const updatedUser = await UserModel.findByIdAndUpdate(req.userId, {$set: updateData}, {new: true});
        if(!updatedUser){
            return res.status(404).json({message: "User not found."});
        }

        res.json({
            message: "User Updated successfully",
            user:{
                username: updatedUser.username,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
            },
        })
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
});

router.get("/bulk", authMiddleware, async (req,res)=>{
    try{
        const filter = (req.query.filter as string) || "";

        const users = await UserModel.find({
            $or: [
                {firstName: {$regex: filter, $options: "i"}},
                {lastName: {$regex: filter, $options: "i"}},
            ],
        }).select("username firstName lastName _id");

        res.status(200).json({
            users: users.map((user)=>({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            })),
        });
    }catch(error){
        console.error("Error fetching users: ",error);
        res.status(500).json({message: "Server error"});
    }
})


export default router;