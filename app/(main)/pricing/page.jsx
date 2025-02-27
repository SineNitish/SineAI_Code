'use client'
import PricingModel from '@/components/custom/PricingModel'
import { UserDetailContext } from '@/context/UserDetailContext'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import React, { useContext } from 'react'

const Pricing = () => {
    const {userDetail,setUserDetail}=useContext(UserDetailContext)
    console.log("User Detial:",userDetail);
  return (
    <div className='mt-20 flex flex-col justify-center items-center w-full p-10 md:px-32 lg:px-48' style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '20%'}}>
        <h2 className='font-bold text-5xl'>Pricing</h2>
        <p className='text-gray-400 text-center mt-4 w-2/4 '>{Lookup.PRICING_DESC}</p>
        <div className='p-5 border rounded-xl w-full flex justify-between mt-7 items-center' style={{backgroundColor:Colors.BACKGROUND}} >
            <h2 className='text-lg'><span className='font-bold'>{userDetail?.token}</span> Token Left</h2>
            <div className=''>
              <h2 className='font-medium '>Need more token?</h2>
              <p>Upgrade your plan below</p>
            </div>
        </div>
        <PricingModel/>
    </div>
  )
}

export default Pricing