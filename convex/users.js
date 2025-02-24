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
      });
    }
  }
);

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async ({ db }, args) => {
    const user = await db.query("users").filter((q) => q.eq(q.field("email"), args.email)).collect();
    return user[0] || null;
  },
});
