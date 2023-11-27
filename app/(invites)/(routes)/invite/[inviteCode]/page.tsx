import { currentprofile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InvitedCodePageProps{
    params:{
       inviteCode:string 
    }
}


const InvitedCodePage=async({
    params
}:InvitedCodePageProps)=>{

    const profile=await currentprofile();

    if(!profile){
        return redirectToSignIn();
    }

     if(!params.inviteCode){
        return redirect("/")
     }

const existingServer=await db.server.findFirst({
    where:{
        inviteCode:params.inviteCode,
        member:{
            some:{
                profileId:profile.id
            }
        }
    }
})

if (existingServer){
    return redirect(`/servers/${existingServer.id}`)
}

const server=await db.server.update({
    where:{
        inviteCode:params.inviteCode
    },
    data:{
        member:{
            create:[
                {
                  profileId:profile.id,
                  
                }
            ]
        }
    }
})


if(server){
    return redirect(`/servers/${server.id}`)
}



    return null;
}

export default InvitedCodePage