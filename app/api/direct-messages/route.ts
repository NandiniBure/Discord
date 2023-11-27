import { currentprofile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { DirectMessage, Message } from "@prisma/client";
import { NextResponse } from "next/server"

const MESSAGE_BATCH=10;

export async function GET(
    req:Request
){
   try{
 
     const profile=await currentprofile();
     const {searchParams}=new URL(req.url)

     const cursor=searchParams.get("cursor");
     const conversationId=searchParams.get("conversationId")

     if(!profile){
        return new NextResponse("unauthorized",{status:401})
     }
     if(!conversationId){
        return new NextResponse("conversationId missing",{status:400})
     }

     let message:DirectMessage[]=[];

     if(cursor){
        message=await db.directMessage.findMany({
           take:MESSAGE_BATCH,
           skip:1,
           cursor:{
            id:cursor
           },
           where:{
            conversationId
           },
          include:{
            member:{
                include:{
                    profile:true
                }
            }
          },
          orderBy:{
            createdAt:"desc"
          }

        })
     }else{
        message=await db.directMessage.findMany({
            take:MESSAGE_BATCH,
            where:{
                conversationId
            },
            include:{
                member:{
                    include:{
                        profile:true
                    }
                }
            },
            orderBy:{
                createdAt:"desc"
            }
        })
     }

    

     let nextCursor=null;
     if(message.length===MESSAGE_BATCH){
        nextCursor=message[MESSAGE_BATCH-1].id
     }
     return NextResponse.json({
        items:message,
        nextCursor
     })
   }catch(error){
    console.log("[Direct_Messages_GET]",error)
    return new NextResponse("internal Error",{status:500})
   }  
}