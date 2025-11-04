import { useEffect, useState } from "react";
import {Button} from "./Button"
import { useNavigate } from "react-router-dom";
import axios from "axios";

type userType = {
    firstName: string,
    lastName: string,
    _id: number
}

export const Users = () => {
    const [users, setUsers] = useState<userType[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUsers = async()=>{
            try{
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search}`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data.users || []);
            }catch(error){
                console.error("Error fetching users: ",error);
            }
        };
        fetchUsers();
    },[search]);

    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
    //     const query = e.target.value.toLowerCase();
    //     setUsers(prev=>prev.filter(u=>
    //         u.firstName.toLowerCase().includes(query) ||
    //         u.lastName.toLowerCase().includes(query)
    //     ));
    // }

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map((user)=>(<User key={user._id} user={user} onSendMoney={()=>navigate(`/send?id=${user._id}&name=${user.firstName}`)}/>))}
        </div>
    </>
}

type UserProps = {
    user: userType;
    onSendMoney: ()=>void;
}

function User({user, onSendMoney}: UserProps){
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div className="font=medium">
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button label={"Send Money"} onClick={onSendMoney}/>
        </div>
    </div>
}