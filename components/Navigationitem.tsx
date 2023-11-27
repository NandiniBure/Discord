"use client"

import Image from "next/image"
import { useParams,useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import ActionToolkit from  "@/components/ActionToolkit"

interface NavigationItemProps {
    id:string;
    imgUrl:string;
    name:string;
}




import React from 'react'

const Navigationitem = ({
    id,
    imgUrl,
    name
}:NavigationItemProps) => {
    const img=imgUrl;
    const params=useParams()
    const router=useRouter()
     console.log(params.serverId)
    const onClick=()=>{
        router.push(`/servers/${id}`)
    }

    console.log("imh",img);
  
  return (
  <ActionToolkit
  side="right"
  align="center"
  label={name}> 
<button
onClick={()=>{
    router.push(`/servers/${id}`)
}} 
className=" group relative flex items-center"> 
<div className={
    cn(
        "absolute left-0 bg-primary rounded-r-ful transition-all w-[4px]",
        params?.serverId !== id && "group-hover:h-[20px]",
        params.serverId===id ? "h-[36px]" : "h-[8px]"
    )
}/>
<div className={cn(" relative group flex mx-3 h-[48px] w-[48px] rounded-[24px]  group-hover:rounded-[16px] transition-all overflow-hidden",
params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]")}>   
<Image
 src={img}
 alt="Chanels"
fill
/>
</div>
</button>
  </ActionToolkit>
  )
}

export default Navigationitem