import Image from 'next/image'
import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { UserDetailContext } from '@/context/UserDetailContext'

const Header = () => {
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  return (
    <div className='p-4 flex items-center justify-between '>
        <Image className='rounded-md ' src={'/sineai-logo.png'} width={100} height={100} alt=''></Image>
        {!userDetail &&
        <div className='flex gap-4'>
            <Button variant='ghost'  >Sign-In</Button>
            <Button className='bg-blue-500 text-white hover:text-black'>Get Started</Button>
        </div>
        }
    </div>
  )
}

export default Header