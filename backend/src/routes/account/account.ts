import express from "express";
import { authMiddleware } from "../../midlleware/authMiddleware.js";
import { AccountModel } from "../../db.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", authMiddleware, async (req: any,res)=>{
    try{
        const account = await AccountModel.findOne({userId: req.userId});
        if(!account){
            return res.status(404).json({message: "Account not found"});
        }
        res.json({balance: account.balance});
    }catch(error){
        console.error("Error fetching balance: ", error);
        res.status(500).json({message: "Server Error"});
    }
});

router.post("/transfer", authMiddleware, async (req:any,res)=>{
    const {to,amount} = req.body;

    if(!mongoose.Types.ObjectId.isValid(to)){
        return res.status(400).json({message: "Invalid recipient ID"});
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const sender = await AccountModel.findOne({userId: req.userId}).session(session);
        const receiver = await AccountModel.findOne({userId: to}).session(session);

        if(!sender || !receiver){
            await session.abortTransaction();
            return res.status(400).json({message: "User not found"});
        }

        if(sender.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({message: "Insufficient balance"});
        }

        sender.balance -=amount;
        receiver.balance +=amount;

        await sender.save({session});
        await receiver.save({session});

        await session.commitTransaction();
        res.json({message: "Transfer successfull"});
    }catch(error){
        await session.abortTransaction();
        console.error("Transfer error: ", error);
        res.status(500).json({message: "Server error"});
    }finally{
        session.endSession();
    }
});

export default router;