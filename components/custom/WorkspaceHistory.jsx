"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import React, { useContext } from "react";
import { useSidebar } from "../ui/sidebar";

const WorkspaceHistory = () => {
  const { userDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();

  // Always call useQuery unconditionally
  const workspacesQuery = useQuery(
    api.workspace.GetAllWorkspace, 
    { userId: userDetail?._id || undefined },
    { enabled: !!userDetail?._id }
  );

  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>
      {!userDetail?._id ? (
        <p>Please log in to view your chats.</p>
      ) : workspacesQuery === undefined ? (
        <p>Loading workspaces...</p>
      ) : workspacesQuery.length > 0 ? (
        workspacesQuery.map((workspace) => (
          <Link href={'/workspace/'+workspace._id} key={workspace._id}>
            <h2 
              onClick={toggleSidebar}
              className="text-sm text-gray-400 mt-2 font-light cursor-pointer hover:text-white"
            >
              {workspace.messages[0]?.content || "No messages yet"}
            </h2>
          </Link>
        ))
      ) : (
        <p>No chats available.</p>
      )}
    </div>
  );
};

export default WorkspaceHistory;