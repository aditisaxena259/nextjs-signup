import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { AxiosError } from "axios";
import jwt from "jsonwebtoken"

connect();

export async function POST(request:NextRequest) {
    try{
        const reqBody=request.json();
        const {email,password}=await reqBody;
        console.log(reqBody);

        //check if user exists
        const user=await User.findOne({email});
        if(!user)
        {
            return NextResponse.json({error: "User doesn't exist"},{status:400})
        }

        //check if password exists
        const validPassword= await bcryptjs.compare(password,user.password)
        if(!validPassword)
        {
            return NextResponse.json({error: "Invalid password"},{status:400})
        }

        //create tokenData
        const tokenData={
            id:user._id,
            username: user.username,
            email:user.email
        }

        //create token
        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1h"})

        //putting in user's cookie
        const response=NextResponse.json({message:"Login successful",success:true})
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
    }catch(error:any)
    {
        return NextResponse.json({error: error.message},{status:500})
    }
    
    
}