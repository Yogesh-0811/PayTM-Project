import { useEffect, useState } from "react"

export const Appbar = () => {

    const [username, setUsername] = useState("");

    useEffect(()=>{
        const storedName = localStorage.getItem("username");
        if(storedName) setUsername(storedName);
    },[]);

    const handleLogout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href="/signin";
    };

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Pay App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello, {username}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {username.charAt(0).toUpperCase()}
                </div>
            </div>
            <button onClick={handleLogout} className="mr-4 bg-red-600 text-white px-3 py-1 rounded">Logout</button>
        </div>
    </div>
}