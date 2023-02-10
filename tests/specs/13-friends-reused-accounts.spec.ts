import FriendsScreen from "../screenobjects/FriendsScreen";
import {
  createNewUser,
  getUserKeys,
  grabCacheFolder,
  loadTestUserData,
  loginWithTestUser,
} from "../helpers/commands";

describe("Import User A data and send friend request to User B", async () => {
  it.only("Create a User A reusable account", async () => {
    await createNewUser("TestUserA");
    await grabCacheFolder("TestUserA");
  });

  it("Create a User B reusable account", async () => {
    await driver.reset();
    await createNewUser("TestUserB");
    await grabCacheFolder("TestUserB");
  });

  it("Load again User A", async () => {
    await driver.reset();
    await loadTestUserData("TestUserA");

    // Login with a test user, show main menu and go to Friends Screen
    await loginWithTestUser();

    // Wait
    await browser.pause(300000);
  });

  it("User A sends friend request to User B", async () => {
    await driver.reset();
    await loadTestUserData("TestUserA");

    // Login with a test user, show main menu and go to Friends Screen
    await loginWithTestUser();
    await FriendsScreen.waitForIsShown(true);

    // Retrieve DID Key for User to Add using helper function
    const friendDidKey = await getUserKeys("TestUserB");
    await FriendsScreen.addSomeoneInput.setValue(friendDidKey);
    await FriendsScreen.addSomeoneButton.click();

    // Validate Toast Notification
    await $("~Toast Notification").waitForDisplayed();
    const toastContent = await $("~Toast Notification").$("//*[2]/*[1]");
    const toastClose = await $("~Toast Notification").$("//*[3]");
    await expect(toastContent).toHaveTextContaining("Friend Request Sent!");
    await toastClose.click();

    // Go to pending friend requests screen and validate friend request sent
    await (await FriendsScreen.pendingFriendsButton).click();
    await browser.pause(5000);
  });
});
