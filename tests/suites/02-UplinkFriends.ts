import friends from "../specs/04-friends.spec";
import { deleteCache } from "../helpers/commands";

// Note: The following test suite is not running for now on Windows CI due to appium issues that need investigation
describe("Uplink UI Automated Tests with Reusable Account", function () {
  describe("Friends Screen Tests", friends.bind(this));

  after(async function () {
    await deleteCache();
  });
});
