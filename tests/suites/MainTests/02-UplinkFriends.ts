import friends from "../../specs/04-friends.spec";

// Note: The following test suite is not running for now on Windows CI due to appium issues that need investigation
// This test spec causes random failures on CI that needs to be debugged so I am skipping this for now
describe("Uplink UI Automated Tests with Reusable Account", function () {
  describe("Friends Screen Tests", friends.bind(this));
});
