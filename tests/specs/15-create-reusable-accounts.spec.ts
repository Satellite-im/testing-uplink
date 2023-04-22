import {
  createNewUser,
  grabCacheFolder,
  resetApp,
  saveTestKeys,
} from "../helpers/commands";
import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";

export default async function createReusableAccounts() {
  it("Create ChatUserA reusable account", async () => {
    await resetApp();
    // Create New User and go to Settings Profile Screen
    const username = "ChatUserA";
    await createNewUser(username);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);

    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const didkey = await SettingsProfileScreen.getStatusInputText();

    // Grab cache folder and restart
    await saveTestKeys(username, await didkey.getText());
    await grabCacheFolder(username);
    await resetApp();
  });

  it("Create ChatUserB reusable account", async () => {
    // Create New User and go to Settings Profile Screen
    const username = "ChatUserB";
    await createNewUser(username);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);

    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const didkey = await SettingsProfileScreen.getStatusInputText();

    // Grab cache folder and restart
    await saveTestKeys(username, await didkey.getText());
    await grabCacheFolder(username);
  });
}
