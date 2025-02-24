'use client'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import { Content } from 'next/font/google'
import React, { useContext, useState } from 'react'
import SginDailog from './SginDailog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const [userInput , setUserInput] = useState();
    const {messages,setMessages} = useContext(MessagesContext);
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const [OpenDialog, setOpenDialog]=useState(false);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
    const router=useRouter();
    const onGenerate = async (input) => {
        if (!userDetail?.name) {
          setOpenDialog(true);
          return;
        }
      
        const msg = {
          role: "user",
          content: input, // Ensure `input` is a valid string
        };
      
        try {
          const workspaceId = await CreateWorkspace({
            user: userDetail._id, // Make sure `userDetail._id` is valid
            messages: [msg],      // Pass `messages` as an array of objects
          });
      
          console.log("Workspace ID:", workspaceId);
      
          // Navigate to the new workspace
          router.push("/workspace/" + workspaceId);
        } catch (error) {
          console.error("Failed to create workspace:", error);
        }
      };      
  return (
    <div className='flex flex-col items-center gap-2 mt-36 xl:mt-52'>
        <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
        <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
        <div className='p-5 border rounded-md max-w-2xl w-full mt-3' style={{backgroundColor:Colors.BACKGROUND}}>
            <div className='flex justify-between gap-2' >
                <textarea onChange={(event)=>setUserInput(event.target.value)} className='outline-none w-max h-32 h-max-56 bg-transparent resize-none ' placeholder={Lookup.INPUT_PLACEHOLDER}></textarea>
                {userInput && <ArrowRight
                onClick={()=>onGenerate(userInput)}
                className='p-2 bg-blue-500 h-8 w-8 rounded-md cursor-pointer'/>}
            </div>
            <div>
                <Link className='h-4 w-8'/>
            </div>
        </div>
        <div className='flex flex-wrap max-w-2xl justify-center gap-2 mt-8'>
            {Lookup.SUGGSTIONS.map((item,index)=>(
                <div  key={index}>
                    <h2 
                    onClick={()=>onGenerate(item)}
                    className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer '>{item}</h2>
                </div>
            ))}
        </div>
        <SginDailog openDailog={OpenDialog}closeDailog={(v)=>setOpenDialog(false)}/>
    </div>
  )
}

export default Hero