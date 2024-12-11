"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios  from "axios";
//import { Toast } from "react-hot-toast";
//import { Toast } from "react-bootstrap";
export default function SignupPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisable,setButtonDisabled]=React.useState(false);
    const [loading,setloading]=React.useState(false);
    const onSignup=async()=>{
        try{
            setloading(true);
            const response= await axios.post("/api/users/signup",user);
            console.log("Signup success",response.data);
            router.push("/login");
        }catch(error:any)
        {
            console.log("signup failed",error.message)
            //Toast.error(error.message);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0)
        {
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user]);
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                {loading ? "Processing" : "Signin"}
            </h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                value={user.username}
                onChange={(e)=>setUser({...user,username:e.target.value})}
                placeholder="username"
                />
            <label htmlFor="email">email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                placeholder="email"
                />
            <label htmlFor="password">password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})}
                placeholder="password"
                />
            <button
            onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                    {buttonDisable ? "No signup " : "signup"}
            </button>
            <Link href="/login">Visit Login</Link>
            </div>
    )
}