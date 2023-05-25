import {
  createNewUser,
  grabCacheFolder,
  resetApp,
  saveTestKeys,
} from "../helpers/commands";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
let settingsProfileFirstUser = new SettingsProfileScreen("userA");
let welcomeScreenFirstUser = new WelcomeScreen("userA");

export default async function createReusableAccounts() {
  it("Create reusable account - Chat User A", async () => {
    await resetApp("userA");
    // Create New User and go to Settings Profile Screen
    const username = "ChatUserA";
    await createNewUser(username);
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);
  });

  it("Add profile picture - Chat User A", async () => {
    it("Settings Profile - Add profile picture", async () => {
      await settingsProfileFirstUser.uploadProfilePicture(
        "./tests/fixtures/logo.jpg"
      );
    });
  });

  it("Add banner picture - Chat User A", async () => {
    await settingsProfileFirstUser.uploadBannerPicture(
      "./tests/fixtures/banner.jpg"
    );
  });

  it("Save test account - Chat User A", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    const username = "ChatUserA";
    await settingsProfileFirstUser.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfileFirstUser.pasteUserKeyInStatus();
    const inputTextElement =
      await settingsProfileFirstUser.getStatusInputText();
    const didkey = await inputTextElement.getText();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);

    // Update profile picture from user A

    // Update banner picture from user A
    await grabCacheFolder(username);
    await resetApp("userA");
  });

  it("Create reusable account - Chat User B", async () => {
    // Create New User and go to Settings Profile Screen
    const username = "ChatUserB";
    await createNewUser(username);
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);
  });

  it("Add profile picture - Chat User B", async () => {
    await settingsProfileFirstUser.uploadProfilePicture(
      "./tests/fixtures/second-profile.png"
    );
  });

  it("Add banner picture - Chat User B", async () => {
    it("Settings Profile - Change banner picture", async () => {
      await settingsProfileFirstUser.uploadBannerPicture(
        "./tests/fixtures/second-banner.jpg"
      );
    });
  });

  it("Save test account - Chat User B", async () => {
    const username = "ChatUserB";
    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfileFirstUser.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await settingsProfileFirstUser.pasteUserKeyInStatus();
    const inputTextElement =
      await settingsProfileFirstUser.getStatusInputText();
    const didkey = await inputTextElement.getText();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);
    await grabCacheFolder(username);
  });
}
