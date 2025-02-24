import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkspace = mutation({
    args: v.object({
        user: v.id("users"),
        messages: v.array(
            v.object({
                content: v.string(),
                role: v.string(),
            })
        ),
    }),
    handler: async ({ db }, { user, messages }) => {
        const workspaceId = await db.insert("workspace", {
            user,
            messages,
        });
        return workspaceId;
    },
});

export const GetWorkSpace = query({
    args: {
        workspaceId: v.id("workspace"),
    },
    handler: async ({ db }, { workspaceId }) => {
        const result = await db.get(workspaceId);
        return result;
    },
});
