import createReusableAccounts from "../specs/15-create-reusable-accounts.spec";
import { deleteCache } from "../helpers/commands";

describe("Uplink - Create Test Accounts for Chat Tests", function () {
  describe("Create Test Accounts on MacOS", createReusableAccounts.bind(this));

  after(async function () {
    await deleteCache();
  });
});
