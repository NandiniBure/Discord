import { currentprofile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server"

export async function DELETE(
    req:Request,
    {params}:{params:{channelId:string}}
) {
        try{
       const profile =await currentprofile();
       const {searchParams}=new URL(req.url)

       const serverId=searchParams.get("serverId")
      
       if(!profile){
        return new NextResponse("unauthorized",{status:401})
       }
           
       if(!serverId){
        return new NextResponse("server Id missing",{status:400})
       }

       if(!params.channelId){
        return new NextResponse("channel Id missing",{status:400})
       }


        const server = await db.server.update({
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
                  delete:{
                    id:params.channelId,
                    name:{
                    not:"general"
                    }
                  }  
                }
            }
        })
      return  NextResponse.json(server)
        }catch(error){
             console.log("[Channel_ID_Delete]",error)
             return new NextResponse("internal Error",{status:500})
        } 
} 

export async function PATCH(
    req:Request,
    {params}:{params:{channelId:string}}
) {
        try{
       const profile =await currentprofile();
       const {searchParams}=new URL(req.url)
       const {name,type}=await req.json()
       const serverId=searchParams.get("serverId")
      
       if(!profile){
        return new NextResponse("unauthorized",{status:401})
       }
           
       if(!serverId){
        return new NextResponse("server Id missing",{status:400})
       }

       if(!params.channelId){
        return new NextResponse("channel Id missing",{status:400})
       }

       if(name==="general"){
        return new NextResponse("Name connot be general ",{status:400})
       }

        const server = await db.server.update({
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
                  update:{     
                   where:{
                    id:params.channelId,
                    name:{
                    not:"general"
                    }
                   },
                   data:{
                    name,
                    type
                   }
                  }  
                }
            }
        })
      return  NextResponse.json(server)
        }catch(error){
             console.log("[Channel_ID_Delete]",error)
             return new NextResponse("internal Error",{status:500})
        } 
} 