import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { UserDetailContext } from '@/context/UserDetailContext'

import { ActionContext } from '@/context/ActionContext'
import { usePathname } from 'next/navigation'
import { LucideDownload, Rocket } from 'lucide-react'
import SginDailog from './SginDailog'

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const { action, setAction } = useContext(ActionContext);
  const path = usePathname();
  
  const onActionBtn = (action) => {
    setAction({actionType:action,timeStamp:Date.now()});
    // Add your action handling logic here
    console.log(`Performing ${action} action`);
  }
  
  return (
    <div className='p-4 flex items-center justify-between'>
      <Image 
        className='rounded-md' 
        src='/sineai-logo.png' 
        width={100} 
        height={100} 
        alt='SineAI Logo'
      />
      
      {!userDetail ? (
        <div className='flex gap-4'>
          <Button 
            onClick={() => setOpenDialog(true)} 
            variant='ghost'
          >
            Sign-In
          </Button>
          <Button className='bg-blue-500 text-white hover:bg-blue-600'>
            Get Started
          </Button>
        </div>
      ) : path?.includes('workspace') && (
        <div className='flex gap-2 items-center'>
          <Button 
            variant='ghost' 
            onClick={() => onActionBtn('export')}
          >
            <LucideDownload className="mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => onActionBtn('deploy')} 
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <Rocket className="mr-2" />
            Deploy
          </Button>
        </div>
      )}
      
      <SginDailog
        openDialog={openDialog} 
        closeDialog={(v) => setOpenDialog(false)} 
      />
    </div>
  )
}

export default Header