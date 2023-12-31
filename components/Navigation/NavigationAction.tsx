"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import ActionToolkit from '../ActionToolkit'
import { useModal } from '@/hooks/use-model-store'
const NavigationAction = () => {

  const {onopen}=useModal();

  return (
    <div>
      <ActionToolkit
      side='right'
      align='center'
      label='Add a Server' >
        <button
        onClick={()=>onopen("createServer")}
        className='group flex items-center '>
            <div className=' flex mx-3 h-[48px] w-[48px]
             rounded-[24px] group-hover:rounded-[16px]
              transition-all overflow-hidden items-center
               justify-center bg-background dark:bg-neutral-700
               group-hover:bg-emerald-500 '>
                <Plus
                size={25}
                className=' group-hover:text-white transition text-emerald-500'/>
              </div>
        </button>
        </ActionToolkit>
    </div>
  )
}

export default NavigationAction