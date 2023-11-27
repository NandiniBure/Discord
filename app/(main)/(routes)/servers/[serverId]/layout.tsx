import { currentprofile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {ServerSidebar}  from "@/components/server/serverSidebar";

const ServerIdLayout=async({
    children,
    params,
}:{
    children: React.ReactNode;
    params:{serverId : string}
})=>{
    const profile=await currentprofile();
   
    if(!profile){
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where:{
            id:params.serverId,
            member:{
                some:{
                    profileId:profile.id
                }
            }
        }

    })

    if(!server){
        return redirect("/")
    }

return (
    <div className=" h-full">
        <div 
        className=" hidden md:block md:full h-full w-60 z-20 flex-col fixed
        inset-y-0">
        <ServerSidebar serverId={params.serverId}/>
        </div>
        <main className=" h-full md:pl-60">
            {children}
        </main>
        
    </div>
)
}

export default ServerIdLayout;