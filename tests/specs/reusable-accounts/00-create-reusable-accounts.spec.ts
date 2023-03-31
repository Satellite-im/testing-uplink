const { execSync } = require("child_process");
import FriendsScreen from "../../screenobjects/FriendsScreen";
import {
  createNewUser,
  grabCacheFolder,
  resetAndLoginWithCache,
  resetApp,
} from "../../helpers/commands";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";
let userAKey, userBKey;

describe("Create Reusable Accounts and Save Data - One instance at a time", () => {
  it("Create a User A reusable account", async () => {
    await createNewUser("ChatUserA");
    await WelcomeScreen.goToFriends();
    await FriendsScreen.clickOnCopyID();
    userAKey = await getClipbboardMacOS();
    await grabCacheFolder("ChatUserA");
    await resetApp();
  });

  it("Create a User B reusable account", async () => {
    await createNewUser("ChatUserB");
    await WelcomeScreen.goToFriends();
    await FriendsScreen.clickOnCopyID();
    await FriendsScreen.enterCopiedID();
    userBKey = await getClipbboardMacOS();
    console.log("UserBKey is: " + userBKey);
  });

  it("User B sends friend request to User A", async () => {
    // Retrieve DID Key for User A using helper function
    await FriendsScreen.enterFriendDidKey(userAKey);
    await FriendsScreen.addSomeoneButton.click();

    // Validate Toast Notification
    expect(await FriendsScreen.toastNotificationText).toHaveTextContaining(
      "Friend Request Sent!"
    );
    await (
      await FriendsScreen.toastNotification
    ).waitForDisplayed({ reverse: true });

    // Go to pending friend requests screen and validate friend request sent
    await FriendsScreen.goToPendingFriendsList();
    const abbreviatedFriendKey = await FriendsScreen.getAbbreviatedDidKey(
      userAKey
    );
    const outgoingList = await FriendsScreen.getOutgoingList();
    expect(outgoingList.includes(abbreviatedFriendKey)).toEqual(true);
    await grabCacheFolder("ChatUserB");
  });

  it("User A accepts friend request to User B", async () => {
    await resetAndLoginWithCache("ChatUserA");
    await WelcomeScreen.goToFriends();

    // Go to pending friend requests screen and validate friend request sent
    await FriendsScreen.goToPendingFriendsList();
    await browser.pause(10000);
  });
});
