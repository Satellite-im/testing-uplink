import friends from "../specs/04-friends.spec";

// Note: The following test suite is not running for now on Windows CI due to appium issues that need investigation
describe("Uplink UI Automated Tests with Reusable Account", function () {
  xdescribe("Friends Screen Tests", friends.bind(this));
});
