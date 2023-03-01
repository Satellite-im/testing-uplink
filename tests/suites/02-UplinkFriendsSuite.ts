import friends from "../specs/04-friends.spec";

describe("Uplink UI Automated Tests with Reusable Account", async () => {
  describe("Friends Screen Tests", friends.bind(this));
});
