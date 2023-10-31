import "module-alias/register";
import friendRequestUserATests from "@specs/reusable-accounts/ChatUserA/01-create-account.spec";

describe("MacOS Chats Tests - User A", async () => {
    describe("Friends and Chat Main Tests", friendRequestUserATests.bind(this));
})