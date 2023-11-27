"use client"
import { serverWithMembersWithProfile } from "@/type"
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Trash, UserPlus, Users } from "lucide-react";
import { DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Settings } from "lucide-react";
import { useModal } from "@/hooks/use-model-store";
interface ServerHeaderProps{
 server : serverWithMembersWithProfile;
 role?: MemberRole
}

export const ServerHeader=({
    server,
    role
}:ServerHeaderProps)=>{
      const {onopen}=useModal();
    const isAdmin= role===MemberRole.ADMIN;
    const isModerator= isAdmin || role===MemberRole.MODERATOR
    return(
       <DropdownMenu>
       <DropdownMenuTrigger
       className="focus:outline-none"
       asChild>
      <button
      className="w-full text-md font-semibold px-3 flex
      items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10
      dark:hover:bg-zinc-700/50 transition">
        {server.name}
        <ChevronDown className=" h-5 w-5 ml-auto"/>
      </button>
       </DropdownMenuTrigger>
       <DropdownMenuContent
       className=" w-56 text-xs font-medium text-black dark:text-neutral-400
       space-y-[2px] ">
        {isModerator && (
          <DropdownMenuItem
          onClick={()=>onopen("invite",{server})}
          className=" text-indigo-600 flex dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
            Invite People
          <UserPlus className=" h-4 w-4 ml-auto "/>
          </DropdownMenuItem>  
        )
        }
         {isAdmin && (
          <DropdownMenuItem
          onClick={()=>onopen("editServer",{server})}
          className=" px-3 py-2 text-sm flex cursor-pointer">
            Server Settings
            <Settings className="h-4 w-4 ml-auto"/>
          </DropdownMenuItem>  
        )
        }
     {isAdmin && (
          <DropdownMenuItem
          onClick={()=>onopen("members",{server})}
          className=" px-3 py-2 text-sm flex cursor-pointer">
            Manage Members
            <Users className="h-4 w-4 ml-auto"/>
          </DropdownMenuItem>  
        )

        }
     {isModerator && (
          <DropdownMenuItem
          onClick={()=>onopen("createChannel",{server})}
          className=" px-3 py-2 text-sm flex cursor-pointer">
           Create Channel 
            <PlusCircle className="h-4 w-4 ml-auto"/>
          </DropdownMenuItem>  
        )
        }
          {isModerator && (   
               <DropdownMenuSeparator/>
        )
        }

{isAdmin && (   
         <DropdownMenuItem
         onClick={()=>onopen("deleteServer",{server})}
                   className=" text-rose-500 px-3 py-2 text-sm flex cursor-pointer">
                   Delete Server
                     <Trash className="h-4 w-4 ml-auto"/>
                   </DropdownMenuItem>  
        )
 }

{!isAdmin && (   
         <DropdownMenuItem
         onClick={()=>onopen("leaveServer",{server})}
                   className=" text-rose-500 px-3 py-2 text-sm flex cursor-pointer">
                  Leave Server 
                     <LogOut className="h-4 w-4 ml-auto"/>
                   </DropdownMenuItem>  
        )
 }
       </DropdownMenuContent>
    </DropdownMenu>
    )
}

