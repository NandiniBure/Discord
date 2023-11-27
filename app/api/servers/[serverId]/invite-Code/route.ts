import { currentprofile } from "@/lib/current-profile"
import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import {v4 as uuidv4} from "uuid"
export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}
) {
   try{
  const profile =await currentprofile();

  if(!profile){
 return new NextResponse("Unauthorize",{status:401})
  }

  if(!params.serverId){
    return new NextResponse("server ID Missing",{status:400})
  }

const server=await db.server.update({
where:{
    id:params.serverId,
    profileId:profile.id
},
data:{
    inviteCode:uuidv4()
}
})

return NextResponse.json(server)
   }catch(error){
    console.log("[Server_ID]",error)
    return new NextResponse("Internal error",{status:500})
   } 
}