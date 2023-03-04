const { execSync } = require("child_process");
import FriendsScreen from "../../screenobjects/FriendsScreen";
import {
  createNewUser,
  grabCacheFolder,
  resetApp,
} from "../../helpers/commands";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";
let userAKey: string = "";

// Skipped since offline messaging is not ready yet
xdescribe("Create Reusable Accounts and Save Data - One instance at a time", () => {
  it("Create a User A reusable account", async () => {
    await createNewUser("TestUserA");
    await WelcomeScreen.goToFriends();
    await FriendsScreen.clickOnCopyID();
    userAKey = await execSync("pbpaste", { encoding: "utf8" });
    await grabCacheFolder("TestUserA");
    await resetApp();
  });

  it("Create a User B reusable account", async () => {
    await createNewUser("TestUserB");
    await WelcomeScreen.goToFriends();
    await FriendsScreen.clickOnCopyID();
  });

  it("User B sends friend request to User A", async () => {
    // Retrieve DID Key for User A using helper function
    await FriendsScreen.addSomeoneInput.setValue(userAKey);
    const abbreviatedFriendKey = FriendsScreen.getAbbreviatedDidKey(userAKey);
    await FriendsScreen.addSomeoneButton.click();

    // Validate Toast Notification
    await $("~Toast Notification").waitForDisplayed();
    const toastContent = await $("~Toast Notification").$("//*[2]/*[1]");
    const toastClose = await $("~Toast Notification").$("//*[3]");
    await expect(toastContent).toHaveTextContaining("Friend Request Sent!");
    await toastClose.click();
    await $("~Toast Notification").waitForDisplayed({ reverse: true });

    // Go to pending friend requests screen and validate friend request sent
    await (await FriendsScreen.pendingFriendsButton).click();
    const outgoingList = await FriendsScreen.getOutgoingList();
    expect(outgoingList.includes(abbreviatedFriendKey)).toEqual(true);
    await grabCacheFolder("TestUserB");
  });
});
