import { currentprofile }  from "@/lib/current-profile"
import { NextResponse } from "next/server"
import { db } from "@/lib/db";

export async function DELETE(
  req:Request,
  {params}:{params:{serverId:string}}
) {
    try{
    const profile=await currentprofile();

    if(!profile){
      return new NextResponse("unauthorized",{status:401});
    }

    
  const server=await db.server.delete({
  where:{
      id:params.serverId,
      profileId:profile.id
  }
  })
    return NextResponse.json(server)
    }catch(error){
      console.log("[Serer_id_delete]",error)
      return new NextResponse("internal Error",{status:500})
    }
}


export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}
) {
      try{
      const profile=await currentprofile();
      if(!profile){
        return new NextResponse("unauthorized",{status:401});
      }

      const {name,imageUrl}=await req.json();
    const server=await db.server.update({
    where:{
        id:params.serverId,
        profileId:profile.id
    },
    data:{
          name,
          imageUrl
    }
    })
      return NextResponse.json(server)
      }catch(error){
        console.log("[Serer_id_Patch]",error)
        return new NextResponse("internal Error",{status:500})
      }
}