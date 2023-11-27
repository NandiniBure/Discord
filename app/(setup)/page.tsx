import { initialprofile } from '@/lib/initial-profile'
import React from 'react'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import {InitialModel} from '@/components/modals/initial-model';
const Setup = async() => {
    const profile=await initialprofile();

    const server=await db.server.findFirst({
        where:{
          member:{
            some:{
                profileId:profile.id
            }
          }  
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    }

  return (
    <div>
    <InitialModel/>
    </div>

  )
}

export default Setup