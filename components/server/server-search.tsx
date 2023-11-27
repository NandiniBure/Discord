"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { useParams, useRouter } from 'next/navigation';
interface ServerSearchProps{
    data:{
       label:string,
       type:"channel" | "member",
       data:{
        icon:React.ReactNode;
        name:string;
        id:string;
       } []  | undefined
    }[] 
}


const Serversearch = ({
    data
}:ServerSearchProps) => {

const router=useRouter();
const params=useParams();

const Onclick=({id,type}:{id:string,type:"channel" | "member"})=>{
  setopen(false);

  if(type==="member"){
    return router.push(`/servers/${params?.serverId}/conversations/${id}`)
  }
  if(type==="channel"){
    return router.push(`/servers/${params?.serverId}/channels/${id}`)
  }
}


    useEffect(()=>{
            const down =(e:KeyboardEvent)=>{
      if(e.key==="k" && (e.metaKey || e.ctrlKey )){
        e.preventDefault();
        setopen((open)=>!open)
      }
            }
    },[])

    const [open,setopen]=useState(false)

  return (
    <>
    <Button
    onClick={()=>setopen(true)}
    className=' group px-2 rounded-md flex items-center  dark:bg-black
    gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>

       <Search className='w-4 h-4 text-zinc-500 dark:text-zinc-400'
       />
       <p className=' font-semibold text-sm text-zinc-500
       dark:text-zinc-400 group-hover:text-zinc-600
       dark:group-hover:text-zinc-300 transition'>
        Search
       </p>
      <kbd
       className=' pointer-events-none inline-flex h-5 select-none
       items-center gap-1 rounded border bg-muted px-1.5 text-[10px]
       font-medium text-muted-foreground ml-auto' >
 <span className=' text-sm'>CMD</span>K
     </kbd> 
    </Button>
    <CommandDialog open={open} onOpenChange={setopen}>
    <CommandInput placeholder='Search all channels and members'/>
    <CommandList>
        <CommandEmpty>
               No result found
        </CommandEmpty>
        {data.map(({label,type,data})=>{
            if(!data?.length) return null;

            return(
              <CommandGroup key={label}
              heading={label}>
                {data.map(({id,icon,name})=>{
                    return(<CommandItem key={id}
                    onClick={()=>Onclick({id,type})}>
                        {icon}
                        <span>{name}</span>
                    </CommandItem>)
                })}
              </CommandGroup>  
            )
        })}
    </CommandList>
    </CommandDialog>
    </>
  )
}

export default Serversearch