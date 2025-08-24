import { Inngest } from "inngest";
import { connectDB } from "./conectionDB.js";
import { User } from "../models/User.model.js";
import { ENV } from "./env.js";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "slack_clone",
  name: "Slack Clone Functions",
  signingKey: ENV.INNGEST_SIGNING_KEY ,
});

// Create an Inngest function: Sync user from Clerk
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      email: email_addresses?.[0]?.email_address || "",
      name: `${first_name || ""} ${last_name || ""}`,
      image: image_url,
      clerkId: id
    };

    await User.create(newUser);
  }
);

// Delete user from DB
const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });
    // TODO: delete user data from other collections
  }
);

export const functions = [syncUser, deleteUserFromDB];
