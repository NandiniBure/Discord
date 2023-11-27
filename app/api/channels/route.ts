import { currentprofile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
export async function POST(
    req:Request
) {
     try{
         const{name,type}=await req.json()
        const {searchParams}=new URL(req.url)
        const profile=await currentprofile();

        const serverId=searchParams.get("serverId")

        if(!profile){
            return new NextResponse("unauthorized",{status:401})
        }
        if(!serverId){
            return new NextResponse("server Id missing",{status:400})
        }
     
         if(name==="general")
         {
            return new NextResponse("name cannot be general",{status:400})
         }
   
         const server=await db.server.update({
            where:{
                id:serverId,
                member:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.ADMIN,MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
            channel:{
                create:{
                     profileId:profile.id,
                     name,
                     type
                }
            }
            }
         })
       return NextResponse.json(server)  
     } catch(error){
   console.log("Channel_POST",error)
   return new NextResponse("internal Error",{status:500})
     }
}