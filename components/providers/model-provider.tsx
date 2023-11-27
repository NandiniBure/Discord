"use client"

import CreateServerModel from "@/components/modals/create-server-model"
import { useEffect, useState } from "react"
import InviteModel from "@/components/modals/invite-model"
import EditServerModel from "../modals/edit-server-model"
import MembersModel from "../modals/members-model"
import CreateChannelModel from "../modals/create-channel-model"
import LeaveServerModel from "../modals/leave-server-model"
import DeleteServerModel from "../modals/delete-server-model"
import DeleteChannelModel from "../modals/delete-channel-model"
import EditChannelModel from "../modals/edit-channel-model"
import { MessageFileModel } from "../modals/message-file-modal"
import DeleteMessageModel from "../modals/delete-message-model"

export const ModelProvider=()=>{
    const [isMounded,setisMounted]=useState(false)

    useEffect(()=>{
        setisMounted(true);
    },[])

    if(!isMounded){
        return null
    }

    return(
        <>
        <CreateServerModel/>
        <InviteModel/>
        <EditServerModel/>
        <MembersModel/>
        <CreateChannelModel/>
        <LeaveServerModel/>
        <DeleteServerModel/>
        <DeleteChannelModel/>
        <EditChannelModel/>
        <MessageFileModel/>
        <DeleteMessageModel/>
        </>
       
    )
}
