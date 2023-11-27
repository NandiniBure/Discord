
import { Channel, ChannelType, Server } from "@prisma/client";
import {create} from "zustand";


export type ModelType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" |
 "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";
 
interface ModelData{
  server? : Server;
  channelType?:ChannelType;
  channel?:Channel;
  apiUrl?:string;
  query?:Record<string,any>
}

interface ModelStore{
    type : ModelType | null;
    data:ModelData;
    isopen : boolean;
    onopen:(type : ModelType,data?:ModelData)=>void
    onClose:()=>void
}

export const useModal = create<ModelStore>((set)=>({
    type:null,
    data:{},
    isopen:false,
    onopen:(type,data)=>set({isopen:true,type,data}),
    onClose:()=>set({type:null,isopen:false})
}))