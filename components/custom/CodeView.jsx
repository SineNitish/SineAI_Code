"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { api } from "@/convex/_generated/api";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { ActionContext } from "@/context/ActionContext";

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { id } = useParams();
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const UpdateTokens= useMutation(api.users.UpdateToken);
  const {action,setAction}=useContext(ActionContext);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  useEffect(()=>{
    setActiveTab('preview')
  },[action])
  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkSpace, {
      workspaceId: id,
    });
    const mergeFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergeFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GenrateAiCode();
      }
    }
  }, [messages]);

  const GenrateAiCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });
    console.log(result.data);
    const aiResp = result.data;

    const mergeFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergeFiles);

    await UpdateFiles({
      workspaceId: id,
      files: aiResp?.files,
    });

    const token=Number(userDetail?.token)-Number(countToken(JSON.stringify(aiResp)));
        //Update Tokens in Database
        setUserDetail(prev=>({
          ...prev,
          token:token
        }))

        await UpdateTokens({
          userId:userDetail?._id,
          token:token      
      });

    setActiveTab('code')

    setLoading(false);
  };
  return (
    <div className="relative ">
      <div className="border bg-[#181818] w-full p-2">
        <div className="bg-black flex items-center justify-center flex-wrap rounded-full shrink-0 w-[140px] gap-3 p-1">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${activeTab == "code" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${activeTab == "preview" && "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        options={{
          externalResources: ["https://unpkg.com/@tailwindcss/browser@4"],
        }}
        files={files}
        template="react"
        theme={"dark"}
        customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
      >
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandpackPreviewClient/>
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading&&<div className="p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex flex-col items-center justify-center ">
        {/* Replace Loader2Icon with a GIF */}
        <img src="/SineLoading.gif" alt="Loading..." className="h-2/5 w-3/5 mb-2" />

        {/* Loading text */}
        <h2 className="text-white text-xl">Generating your files...</h2>
      </div>}
    </div>
  );
};

export default CodeView;
