import { currentprofile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ChannelType, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'
import { ServerHeader } from './server-header'
import { ScrollArea } from '../ui/scroll-area'
import Serversearch from './server-search'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { channel } from 'diagnostics_channel'
import { Separator } from '../ui/separator'
import Serversection from './server-section'
import Serverchannel from './server-channel'
import { Servermember } from './server-member'
interface ServerSidebaeprops{
    serverId:string
}


const iconMap={
  [ChannelType.TEXT]: <Hash className=' mr-2 h-4 w-4 '/>,
  [ChannelType.AUDIO]: <Mic className=' mr-2 h-4 w-4 '/>,
  [ChannelType.VIDEO]: <Video className=' mr-2 h-4 w-4 '/>
}

const roleIconMap={
  [MemberRole.GUEST]:null,
  [MemberRole.MODERATOR]:<ShieldCheck className=' h-4 w-4 text-indigo-500'/>,
  [MemberRole.ADMIN]:<ShieldAlert className=' h-4 w-4 text-rose-500'/>
}

export const ServerSidebar = async({
  serverId
}:ServerSidebaeprops) => {

   
    const profile=await currentprofile();
    if(!serverId){
       return  redirect("/")
    }

    const server= await db.server.findUnique({
        where :{
            id:serverId
        },
        include:{
            channel:{
                orderBy:{
                    createdAt:"asc"
                }
            },
            member:{
               include:{
                profile:true,

               },
               orderBy:{
                role:"asc"
               }
            }
        },
     
    })

    const textChannels=server?.channel.filter((channel)=> channel.type===ChannelType.TEXT) 
    const audioChannels=server?.channel.filter((channel)=> channel.type===ChannelType.AUDIO) 
    const videoChannels=server?.channel.filter((channel)=> channel.type===ChannelType.VIDEO) 
    const members=server?.member.filter((member)=>member.profileId !== profile?.id)

if(!server){
  return  redirect("/")
}

const role=server.member.find((member)=> member.profileId===profile?.id)?.role;


  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      <ServerHeader
      server={server}
       role={role}/>
       <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <Serversearch
          data={[
            {
              label:"Text Channel",
              type:"channel",
              data:textChannels?.map((channel)=>({
                icon:iconMap[channel.type],
                name:channel.name,
                id:channel.id,
              }))
            },
            {
              label:"Voice Channel",
              type:"channel",
              data:audioChannels?.map((channel)=>({
                icon:iconMap[channel.type],
                name:channel.name,
                id:channel.id,
              }))
            },
            {
              label:"Voice Channel",
              type:"channel",
              data:videoChannels?.map((channel)=>({
                icon:iconMap[channel.type],
                name:channel.name,
                id:channel.id,
              }))
            },
            {
              label:"members",
              type:"member",
              data:members?.map((member)=>({
                icon:roleIconMap[member.role],
                name:member.profile.name,
                id:member.id,
              }))
            },
          ]}/>
        </div>
        <Separator className=' bg-zinc-200 dark:bg-zinc-700 rounded-md my-2'/>
          {!!textChannels?.length && (
             <div className='mb-2'>
               <Serversection
               sectionType='channels'
               channelType={ChannelType.TEXT}
               role={role}
               label='Text Channels'/>
               <div className='space-y-[2px]'>
               {textChannels.map((channel)=>(
                 <Serverchannel
                 key={channel.id}
                 channel={channel}
                 role={role}
                 server={server}/>
               ))}
               </div>
             </div>
          )}
          {!!audioChannels?.length && (
           
             <div className='mb-2'>
               <Serversection
               sectionType='channels'
               channelType={ChannelType.AUDIO}
               role={role}
               label='audio Channels'/>
                <div className='space-y-[2px]'>
               {audioChannels.map((channel)=>(
                 <Serverchannel
                 key={channel.id}
                 channel={channel}
                 role={role}
                 server={server}/>
               ))}
               </div>
             </div>
          )}
           {!!videoChannels?.length && (
             <div className='mb-2'>
               <Serversection
               sectionType='channels'
               channelType={ChannelType.VIDEO}
               role={role}
               label='video Channels'/>
               <div className='space-y-[2px]'>
               {videoChannels.map((channel)=>(
                 <Serverchannel
                 key={channel.id}
                 channel={channel}
                 role={role}
                 server={server}/>
               ))}
             </div>
             </div>
          )}
           {!!members?.length && (
             <div className='mb-2'>
               <Serversection
               sectionType='members'
               server={server}
               role={role}
               label='Members'/>
               <div className='space-y-[2px]'>
               {members.map((member)=>(
                 <Servermember
                 key={member.id}
                 member={member}
                 server={server}/>
               ))}
               </div>
             </div>
          )}
       </ScrollArea>
      </div>
  )
}
