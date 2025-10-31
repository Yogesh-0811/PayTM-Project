import mongoose, { Schema, Document } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI as string)
        .then(()=>console.log(" MONGODB connected"))
        .catch((err)=>console.error("MONGODB connection error: ",err));

interface UserType extends Document{
    username: string;
    password: string;
    firstName: string;
    lastName: string
}

const userSchema = new Schema<UserType>({
    username: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
});

const UserModel = mongoose.model<UserType>('User', userSchema);

export default UserModel;