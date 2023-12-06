require("module-alias/register");
import createChatAccountsTests from "@specs/reusable-accounts/01-create-accounts-and-friends.spec";

describe("Windows Chats Tests", function () {
  xdescribe(
    "Create Accounts and Chat Tests",
    createChatAccountsTests.bind(this),
  );
});
