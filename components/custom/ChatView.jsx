"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const {toggleSiderbar}=useSidebar();
  useEffect(() => {
    if (id) {
      id && GetWorkspaceData();
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkSpace, {
        workspaceId: id, // Pass `id` directly
      });
      setMessages(result?.messages);
      console.log(result);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    const aiResp = {
      role: "ai",
      content: result.data.result,
    };
    setMessages((prev) => [...prev, aiResp]);
    await UpdateMessages({
      messages: [...messages, aiResp],
      workspaceId: id,
    });
    setLoading(false);
  };

  const onGenerate = (input) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };
  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide px-5">
        {messages?.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 flex gap-2 items-start leading-7"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            {item?.role === "user" && (
              <Image
                className="rounded-full "
                
                src={userDetail?.picture}
                alt="userImage"
                width={35}
                height={35}
              />
            )}
            {/* Wrap ReactMarkdown inside a div and apply styling to the div */}
            <div className="text-white">
              <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating Response...</h2>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex gap-2 items-end">
        {userDetail&& <Image onClick={toggleSiderbar} src={userDetail?.picture} className="rounded-full cursor-pointer" alt="user" width={30} height={30} />
        }<div
          className="p-5 border rounded-md max-w-2xl w-full mt-3"
          style={{ backgroundColor: Colors.BACKGROUND }}
        >
          <div className="flex justify-between gap-2">
            <textarea
              onChange={(event) => setUserInput(event.target.value)}
              value={userInput}
              className="outline-none w-max h-32 h-max-56 bg-transparent resize-none "
              placeholder={Lookup.INPUT_PLACEHOLDER}
            ></textarea>
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="p-2 bg-blue-500 h-8 w-8 rounded-md cursor-pointer"
              />
            )}
          </div>
          <div>
            <Link className="h-4 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
