import {
  createNewUser,
  closeApplication,
  launchApplication,
  loginWithTestUser,
} from "@helpers/commands";
import { USER_A_INSTANCE } from "@helpers/constants";

describe("One time script test for login", async () => {
  it("Should create an account", async () => {
    const username = "test";
    await createNewUser(username);
    await closeApplication(USER_A_INSTANCE);
  });

  for (let i = 1; i <= 100; i++) {
    it("Should login to app and reset - Attempt #" + i, async () => {
      await launchApplication(USER_A_INSTANCE);
      await loginWithTestUser();
      await closeApplication(USER_A_INSTANCE);
    });
  }
});
