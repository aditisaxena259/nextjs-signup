"use client"
import axios from "axios"
//import useRouter from "next/navigation"import Link from 'next/link';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfilePage()
{
    const Router=useRouter();
    const [data,setData]=useState("nothing");
    const logout=async ()=>
    {
        try{
            await axios.get('/api/users/logout')
            Router.push('/login')
        }catch(error:any)
        {
            console.log(error.message);
        }
    }
    const getUserDetails =async ()=>{
        const res=await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>profile page</p>
            <h2>{data==='nothing' ? "Nothing" : <Link href ={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={logout} className="bg blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button onClick={getUserDetails} className="bg green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">getUserDetails</button>
        </div>
    )
}