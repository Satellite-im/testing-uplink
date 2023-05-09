import {
  createNewUser,
  grabCacheFolder,
  resetApp,
  saveTestKeys,
} from "../helpers/commands";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";

export default async function createReusableAccounts() {
  it("Create reusable account - Chat User A", async () => {
    await resetApp();
    // Create New User and go to Settings Profile Screen
    const username = "ChatUserA";
    await createNewUser(username);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
  });

  it("Add profile picture - Chat User A", async () => {
    it("Settings Profile - Add profile picture", async () => {
      await SettingsProfileScreen.uploadProfilePicture(
        "./tests/fixtures/logo.jpg"
      );
    });
  });

  it("Add banner picture - Chat User A", async () => {
    await SettingsProfileScreen.uploadBannerPicture(
      "./tests/fixtures/banner.jpg"
    );
  });

  it("Save test account - Chat User A", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    const username = "ChatUserA";
    await SettingsProfileScreen.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const inputTextElement = await SettingsProfileScreen.getStatusInputText();
    const didkey = await inputTextElement.getText();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);

    // Update profile picture from user A

    // Update banner picture from user A
    await grabCacheFolder(username);
    await resetApp();
  });

  it("Create reusable account - Chat User B", async () => {
    // Create New User and go to Settings Profile Screen
    const username = "ChatUserB";
    await createNewUser(username);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
  });

  it("Add profile picture - Chat User B", async () => {
    await SettingsProfileScreen.uploadProfilePicture(
      "./tests/fixtures/second-profile.png"
    );
  });

  it("Add banner picture - Chat User B", async () => {
    it("Settings Profile - Change banner picture", async () => {
      await SettingsProfileScreen.uploadBannerPicture(
        "./tests/fixtures/second-banner.jpg"
      );
    });
  });

  it("Save test account - Chat User B", async () => {
    const username = "ChatUserB";
    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const inputTextElement = await SettingsProfileScreen.getStatusInputText();
    const didkey = await inputTextElement.getText();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);
    await grabCacheFolder(username);
  });
}
