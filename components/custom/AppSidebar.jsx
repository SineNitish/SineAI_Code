import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Image
          className="rounded-md"
          src={"/sineai-logo.png"}
          alt="SineAI Logo"
          width={100}
          height={100}
        />
        <Button className="mt-5">
        <MessageCircleCode /> Start New Chat
      </Button>
      </SidebarHeader>

      <SidebarContent className="p-5">
        
        <SidebarGroup>
          {/* ✅ Ensuring WorkspaceHistory loads properly */}
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SideBarFooter/>
        </SidebarFooter>
    </Sidebar>
  );
}
