import { useState } from "react"
import axios, {AxiosError} from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () =>{

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");

    const handleSignup = async () => {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                password,
                firstName,
                lastName
            });
            console.log("Signup success: ", response.data);
            alert("Account created successfully!");
            localStorage.setItem("username", username);
            localStorage.setItem("token", response.data.token);
        }catch(error){
            const err =error as AxiosError;
            console.error("Signup failed: ", err.response?.data || err.message);
            alert("Signup failed. Please try again.");
        }
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox placeholder="Yogesh" label={"First Name"} onChange={(e)=> setFirstName(e.target.value)}/>
                <InputBox placeholder="Patil" label={"Last Name"} onChange={(e)=> setLastName(e.target.value)}/>
                <InputBox placeholder="yokoso" label={"Username"} onChange={(e)=> setUsername(e.target.value)}/>
                <InputBox placeholder="123456" label={"Password"} onChange={(e)=> setPassword(e.target.value)}/>
                <div className="pt-4">
                    <Button label={"Sign up"} onClick={handleSignup}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}