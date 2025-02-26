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

export const UpdateMessages=mutation({
    args:{
        workspaceId:v.id('workspace'),
        messages:v.any()
    },
    handler:async(convexToJson,args)=>{
        const result=await convexToJson.db.patch(args.workspaceId,{
            messages:args.messages
        });
        return result
    }
})

export const UpdateFiles=mutation({
    args:{
        workspaceId:v.id('workspace'),
        files:v.any()
    },
    handler:async(convexToJson,args)=>{
        const result=await convexToJson.db.patch(args.workspaceId,{
            fileData:args.files
        });
        return result
    }
})

export const GetAllWorkspace = query({
    args: {
      userId: v.optional(v.id("users")), // ✅ Allow `undefined` userId safely
    },
    handler: async (convexToJson, args) => {
      if (!args.userId) return []; // ✅ Return an empty array if no userId is provided
  
      const result = await convexToJson.db
        .query("workspace")
        .filter((q) => q.eq(q.field("user"), args.userId))
        .collect();
  
      return result;
    },
  });
  