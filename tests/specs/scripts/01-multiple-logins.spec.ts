import {
  createNewUser,
  closeApplication,
  launchApplication,
  loginWithTestUser,
} from "@helpers/commands";

describe("One time script test for login", async () => {
  it("Should create an account", async () => {
    const username = "test";
    await createNewUser(username);
    await closeApplication();
  });

  for (let i = 1; i <= 100; i++) {
    it("Should login to app and reset - Attempt #" + i, async () => {
      await launchApplication();
      await loginWithTestUser();
      await closeApplication();
    });
  }
});
