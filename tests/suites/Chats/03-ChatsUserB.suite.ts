import "module-alias/register";
import friendRequestUserBTests from "@specs/reusable-accounts/ChatUserB/01-create-account.spec";

describe("MacOS Chats Tests - User B", async () => {
    describe("Friends and Chat Main Tests", friendRequestUserBTests.bind(this));
})