import { useState, useEffect } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () =>{

    const [balance, setBalance] = useState(0);

    useEffect(()=>{
        const fetchBalance = async()=>{
            try{
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBalance(response.data.balance);
            }catch(error){
                console.error("Error fetching balance: ", error);
            }
        };
        fetchBalance();
    },[])

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar/>
            <div className="max-w-4xl mx-auto p-4">
                <Balance value={balance}/>
                <Users/>
            </div>
        </div>
    )
}