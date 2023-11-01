import "module-alias/register";
import mainChatsTestsUserA from "@specs/reusable-accounts/ChatUserA/01-main-chats-userA.spec";

describe("MacOS Chats Tests - User A", async () => {
  describe("Accept friend request and Chat", mainChatsTestsUserA.bind(this));
});
