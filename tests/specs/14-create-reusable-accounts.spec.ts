require("module-alias/register");
import { createNewUser } from "@helpers/commandsNewUser";
import { grabCacheFolder, resetApp, saveTestKeys } from "@helpers/commands";
import CropImageProfileModal from "@screenobjects/settings/CropToolProfileModal";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";

export default async function createReusableAccountsTests() {
  it("Create reusable account - Chat User A", async () => {
    await resetApp();
    // Create New User and go to Settings Profile Screen
    const username = "ChatUserA";
    await createNewUser(username);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
  });

  it("Add profile picture - Chat User A", async () => {
    await SettingsProfileScreen.selectProfilePicture(
      "./tests/fixtures/logo.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await CropImageProfileModal.validateCropToolModalIsShown();

    // Do not change the size of picture and just confirm on crop modal
    await CropImageProfileModal.clickOnConfirmButton();

    // Validate new profile picture is displayed
    await SettingsProfileScreen.validateProfilePictureIsShown();
  });

  it("Add banner picture - Chat User A", async () => {
    await SettingsProfileScreen.selectBannerPicture(
      "./tests/fixtures/banner.jpg",
    );
  });

  it("Save test account - Chat User A", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    const username = "ChatUserA";
    await SettingsProfileScreen.openCopyIDContextMenu();
    await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const didkey = await SettingsProfileScreen.getCopiedDidFromStatusInput();

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
    await SettingsProfileScreen.selectProfilePicture(
      "./tests/fixtures/second-profile.png",
    );

    // Validate Crop Tool Modal is displayed
    await CropImageProfileModal.validateCropToolModalIsShown();

    // Do not change the size of picture and just confirm on crop modal
    await CropImageProfileModal.clickOnConfirmButton();

    // Validate new profile picture is displayed
    await SettingsProfileScreen.validateProfilePictureIsShown();
  });

  it("Add banner picture - Chat User B", async () => {
    it("Settings Profile - Change banner picture", async () => {
      await SettingsProfileScreen.selectBannerPicture(
        "./tests/fixtures/second-banner.jpg",
      );
    });
  });

  it("Save test account - Chat User B", async () => {
    const username = "ChatUserB";
    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.openCopyIDContextMenu();
    await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const didkey = await SettingsProfileScreen.getCopiedDidFromStatusInput();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);
    await grabCacheFolder(username);
  });
}
