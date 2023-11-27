import {v4 as uuidv4} from "uuid"
import { currentprofile } from "@/lib/current-profile";
import {MemberRole} from "@prisma/client"
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
     const {name,imageUrl}=await req.json();
     const profile=await currentprofile();

     if(!profile){
        return new NextResponse("unauthorized",{status:401})
     }

     const server =await db.server.create({
        data:{
           profileId:profile.id,
           name,
           imageUrl,
           inviteCode:uuidv4(),
           channel:{
            create:[
               {name:"general",profileId:profile.id}
            ]
           },
           member:{
            create:[
                {
                profileId:profile.id,
                role:MemberRole.ADMIN}
            ]
           }
        }
     })
  return NextResponse.json(server)
    }catch(error){
        console.log(error)
        return new NextResponse("internal error",{status:500})
    }    
}