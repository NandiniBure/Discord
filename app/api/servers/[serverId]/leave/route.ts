import { currentprofile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}
){
    try{
        const profile=await currentprofile()

         if(!profile){
            return new NextResponse("unauthorized",{status:401})
         }

         if(!params.serverId){
            return new NextResponse("server ID missing",{status:400})
         }

    const server=await db.server.update({
        where:{
            id:params.serverId,
            profileId:{
                not:profile.id
            },
            member:{
                some:{
                    profileId:profile.id
                }
            }
        },
        data:{
            member:{
                deleteMany:{
                    profileId:profile.id
                }
            }
        }

     
    })
    return NextResponse.json(server) 
    }catch(error){
      console.log("[server_ID_leave]",error)
      return new NextResponse("internal error",{status:500})
    }
}