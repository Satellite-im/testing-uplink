const { execSync } = require("child_process");
import FriendsScreen from "../../screenobjects/FriendsScreen";
import {
  createNewUser,
  grabCacheFolder,
  resetApp,
} from "../../helpers/commands";
import SettingsGeneralScreen from "../../screenobjects/SettingsGeneralScreen";
import SettingsDeveloperScreen from "../../screenobjects/SettingsDeveloperScreen";
let userAKey: string = "";

// Skipped until the PR https://github.com/Satellite-im/Uplink/pull/279 is merged to retest
xdescribe("Create Reusable Accounts and Save Data", () => {
  it("Create a User A reusable account", async () => {
    await createNewUser("TestUserA");
    await FriendsScreen.goToSettings();
    await SettingsGeneralScreen.goToDeveloperSettings();
    await SettingsDeveloperScreen.clickOnDeveloperMode();
    await SettingsDeveloperScreen.goToFriends();
    await FriendsScreen.clickOnCopyID();
    userAKey = await execSync("pbpaste", { encoding: "utf8" });
    await grabCacheFolder("TestUserA");
  });

  it("Create a User B reusable account", async () => {
    await resetApp();
    await createNewUser("TestUserB");
    await FriendsScreen.goToSettings();
    await SettingsGeneralScreen.goToDeveloperSettings();
    await SettingsDeveloperScreen.clickOnDeveloperMode();
    await SettingsDeveloperScreen.goToFriends();
    await FriendsScreen.clickOnCopyID();
    await grabCacheFolder("TestUserB");
  });

  it("User B sends friend request to User A", async () => {
    // Retrieve DID Key for User A using helper function
    await FriendsScreen.addSomeoneInput.setValue(userAKey);
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
  });
});
