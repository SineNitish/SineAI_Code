'use client'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, { useContext, useState } from 'react'
import SginDailog from './SginDailog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const [userInput, setUserInput] = useState('');
    const {messages, setMessages} = useContext(MessagesContext);
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [OpenDialog, setOpenDialog] = useState(false);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
    const router = useRouter();
    
    const onGenerate = async (input) => {
        if (!userDetail?.name) {
          setOpenDialog(true);
          return;
        }
      
        const msg = {
          role: "user",
          content: input,
        };
      
        try {
          const workspaceId = await CreateWorkspace({
            user: userDetail._id,
            messages: [msg],
          });
      
          console.log("Workspace ID:", workspaceId);
          router.push("/workspace/" + workspaceId);
        } catch (error) {
          console.error("Failed to create workspace:", error);
        }
    };
    
    return (
        <div className="w-full flex justify-center" style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '20%'}}>
            <div className='flex flex-col items-center gap-2 w-full max-w-2xl px-4'>
                <h2 className='font-bold text-4xl text-center'>{Lookup.HERO_HEADING}</h2>
                <p className='text-gray-400 font-medium text-center'>{Lookup.HERO_DESC}</p>
                
                <div className='p-5 border rounded-md w-full mt-3' style={{backgroundColor: Colors.BACKGROUND}}>
                    <div className='flex justify-between gap-2'>
                        <textarea 
                            value={userInput}
                            onChange={(event) => setUserInput(event.target.value)} 
                            className='outline-none w-full h-32 max-h-56 bg-transparent resize-none' 
                            placeholder={Lookup.INPUT_PLACEHOLDER}
                        />
                        {userInput && (
                            <ArrowRight
                                onClick={() => onGenerate(userInput)}
                                className='p-2 bg-blue-500 h-8 w-8 rounded-md cursor-pointer flex-shrink-0'
                            />
                        )}
                    </div>
                    <div>
                        <Link className='h-4 w-8'/>
                    </div>
                </div>
                
                <div className='flex flex-wrap justify-center gap-2 mt-8 w-full'>
                    {Lookup.SUGGSTIONS.map((item, index) => (
                        <div key={index}>
                            <h2 
                                onClick={() => onGenerate(item)}
                                className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer'
                            >
                                {item}
                            </h2>
                        </div>
                    ))}
                </div>
                
                <SginDailog openDailog={OpenDialog} closeDailog={(v) => setOpenDialog(false)} />
            </div>
        </div>
    )
}

export default Hero