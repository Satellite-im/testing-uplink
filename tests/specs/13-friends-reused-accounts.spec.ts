import FriendsScreen from "../screenobjects/FriendsScreen";
import {
  getUserKeys,
  loadTestUserData,
  loginWithTestUser,
} from "../helpers/commands";

describe("Import User A data and send friend request to User B", async () => {
  before(async () => {
    await loadTestUserData("UserA");
  });

  it("User A sends friend request to User B", async () => {
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
