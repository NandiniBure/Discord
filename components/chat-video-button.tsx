"use client"

import qs from "query-string"
import { useRouter,usePathname,useSearchParams } from "next/navigation"
import {Video,VideoOff} from "lucide-react"
import ActionToolkit from "./ActionToolkit"


export const ChatVideoButton=()=>{

    const pathname=usePathname();
    const searchParams=useSearchParams();
    const route=useRouter();
    const isVideo=searchParams?.get("video")

   const  onclick=()=>{
    const url=qs.stringifyUrl({
        url:pathname || "",
        query:{
            video:isVideo ? undefined : true
        }
    },{skipNull:true})
    
    route.push(url)
   }

    const Icon =isVideo ? VideoOff : Video;
    const tooltipLabel= isVideo? "End video call" : "Start video call"


    return(
        <ActionToolkit  side="bottom" label={tooltipLabel}>
            <button onClick={onclick} className="hover:opacity-75 transition mr-4 " >
            <Icon className=" h-6 w-6 text-zinc-500 dark:text-zinc-400"/>
            </button>
        </ActionToolkit>
    )
}