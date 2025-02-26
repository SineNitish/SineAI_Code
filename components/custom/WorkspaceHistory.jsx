"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex, useQuery } from "convex/react";
import Link from "next/link";
import { comma } from "postcss/lib/list";
import React, { useContext } from "react";
import { useSidebar } from "../ui/sidebar";

const WorkspaceHistory = () => {
  const { userDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const {toggleSidebar}=useSidebar();

  // ✅ Always call useQuery, but avoid errors if userDetail is missing
  const workspaces = useQuery(api.workspace.GetAllWorkspace, { 
    userId: userDetail?._id || ""  // Default to empty string to prevent query issues
  });

  console.log(workspaces);

  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>
      {userDetail ? (
        workspaces ? (
          workspaces.length > 0 ? (
            // ✅ Proper JSX syntax for .map()
            workspaces.map((workspace,index) => (
                <Link href={'/workspace/'+workspace._id} key={index}>
              <h2 onClick={toggleSidebar}
                className="text-sm text-gray-400 mt-2 font-light cursor-pointer hover:text-white" 
                key={workspace._id}
              >
                {workspace.messages[0]?.content || "No messages yet"}
              </h2>
              </Link>
            ))
          ) : (
            <p>No chats available.</p>
          )
        ) : (
          <p>Loading workspaces...</p>
        )
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default WorkspaceHistory;
