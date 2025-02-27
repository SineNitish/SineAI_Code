const { v } = require("convex/values");
const { mutation, query } = require("./_generated/server");

export const CreateUser = mutation(
  async ({ db }, { name, email, picture, uid }) => {
    if (!email || !name || !uid) {
      throw new Error("Missing required fields: name, email, or uid");
    }

    const user = await db.query("users").filter((q) => q.eq(q.field("email"), email)).collect();
    if (user.length === 0) {
      await db.insert("users", {
        name,
        picture,
        email,
        uid,
        token: 50000,
      });
    }
  }
);

export const GetUser = query({
  args: {
    email: v.optional(v.string()), // Make email optional
  },
  handler: async ({ db }, args) => {
    if (!args.email) {
      return null; // Return null if no email is provided
    }
    
    const user = await db.query("users").filter((q) => q.eq(q.field("email"), args.email)).collect();
    return user[0] || null;
  },
});

export const UpdateToken = mutation({
  args: {
    token: v.number(),
    userId: v.id('users')
  },
  handler: async({ db }, args) => { // Fixed parameter name from convexToJson to the correct { db }
    const result = await db.patch(args.userId, {
      token: args.token
    });
    return result;
  }
})