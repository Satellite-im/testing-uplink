import "module-alias/register";
import mainChatsTestsUserB from "@specs/reusable-accounts/ChatUserB/01-main-chats-userB.spec";

describe("MacOS Chats Tests - User B", async () => {
  describe("Send friend request and Chat", mainChatsTestsUserB.bind(this));
});
