import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

const SginDailog = ({openDailog,closeDailog}) => {
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser)
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer '+tokenResponse?.access_token } },
      );
  
      console.log(userInfo);
      const user = userInfo.data;
      await CreateUser({
        name:user?.name,
        email:user?.email,
        picture:user?.picture,
        uid:uuid4()
      })

      if(typeof window!==undefined)
      {
        localStorage.setItem('user',JSON.stringify(user))
      }

      setUserDetail(userInfo?.data)
      //save this inside out Database
      closeDailog(false)
    },
    onError: errorResponse => console.log(errorResponse),
  });
  return (
    <Dialog open={openDailog} onOpenChange={closeDailog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div className="flex flex-col items-center justify-center gap-3">
            <h2 className="font-bold text-2xl text-center">{Lookup.SIGNIN_HEADING}</h2>
            <p className="mt-2 text-center text-lg">{Lookup.SIGNIN_SUBHEADING}</p>
            <Button onClick={googleLogin} className="mt-3 bg-blue-500 text-white hover:bg-blue-400">
              Sign In with Google
            </Button>
            <p className="m1-3 ">{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>  
  );
};

export default SginDailog;
