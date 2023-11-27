"use client"
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import qs from "query-string"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"


import { Button } from "../ui/button"
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import Fileupload from "../file-upload"
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";


const DeleteMessageModel = () => {
  const {onopen,isopen,onClose,type,data}=useModal();

 const isModelOpen=isopen && type==="deleteMessage"
 const {apiUrl,query}=data;

const[isloding,setisloding]=useState(false)


const Onclick=async()=>{
try{
   setisloding(true) 
   const url=qs.stringifyUrl({
      url:apiUrl || "",
      query
   })
   await axios.delete(url)
   onClose();
}catch(error){
   console.log(error)
}finally{
    setisloding(false)
}
}

  return (
    
    <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden ">
           <DialogHeader className="pt-8 px-6">
            <DialogTitle className=" text-center text-2xl font-bold">
              Delete Message
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">Are you sure you want this?
               <br/>
               this message will be permanently deleted.
            </DialogDescription>
            </DialogHeader> 
           <DialogFooter className=" bg-gray-100 px-6 py-4">
           <div className=" flex items-center justify-between w-full">
            <Button 
            disabled={isloding}
            onClick={()=>{onClose}}
            variant="ghost">
                Cancel
            </Button>
            <Button
             disabled={isloding}
             onClick={Onclick}
             variant="primary">
                Confirm
            </Button>
           </div>
           </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteMessageModel;