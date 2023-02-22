import FriendsScreen from "../screenobjects/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsDeveloperScreen from "../screenobjects/SettingsDeveloperScreen";
import { loginWithRandomUser, showMainMenu } from "../helpers/commands";

describe("Settings - Developer - Tests", async () => {
  it("Settings Developer - Validate headers and descriptions from Settings Sections", async () => {
    // Login with a random user, show main menu, go to Settings Screen and finally select the Settings Screen to validate
    await loginWithRandomUser();
    await showMainMenu();
    await FriendsScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
    await SettingsGeneralScreen.goToDeveloperSettings();
    await SettingsDeveloperScreen.waitForIsShown(true);

    // Validate DEVELOPER MODE section
    await expect(
      await SettingsDeveloperScreen.developerModeHeader
    ).toHaveTextContaining("DEVELOPER MODE");
    await expect(
      await SettingsDeveloperScreen.developerModeDescription
    ).toHaveTextContaining(
      "Enabling developer mode adds logging and displays helpful debug information on the UI."
    );

    // Validate OPEN CODEBASE section
    await expect(
      await SettingsDeveloperScreen.openCodebaseHeader
    ).toHaveTextContaining("OPEN CODEBASE");
    await expect(
      await SettingsDeveloperScreen.openCodebaseDescription
    ).toHaveTextContaining("Opens the codebase in your default web browser.");

    // Validate TEST NOTIFICATION section
    await expect(
      await SettingsDeveloperScreen.testNotificationHeader
    ).toHaveTextContaining("TEST NOTIFICATION");
    await expect(
      await SettingsDeveloperScreen.testNotificationDescription
    ).toHaveTextContaining("Sends a test notification");

    // Validate OPEN CACHE section
    await expect(
      await SettingsDeveloperScreen.openCacheHeader
    ).toHaveTextContaining("OPEN CACHE");
    await expect(
      await SettingsDeveloperScreen.openCacheDescription
    ).toHaveTextContaining("Open the cache in your default file browser.");

    // Validate COMPRESS & DOWNLOAD CACHE section
    await expect(
      await SettingsDeveloperScreen.compressAndDownloadCacheHeader
    ).toHaveTextContaining("COMPRESS & DOWNLOAD CACHE");
    await expect(
      await SettingsDeveloperScreen.compressAndDownloadCacheDescription
    ).toHaveTextContaining(
      "For debugging with other developers, you can compress your cache to zip and share it. Don't do this if this is a real account you use."
    );

    // Validate CLEAR CACHE section
    await expect(
      await SettingsDeveloperScreen.clearCacheHeader
    ).toHaveTextContaining("CLEAR CACHE");
    await expect(
      await SettingsDeveloperScreen.clearCacheDescription
    ).toHaveTextContaining("Reset your account, basically.");

    // Validate SAVE LOGS IN A FILE section
    await expect(
      await SettingsDeveloperScreen.saveLogsHeader
    ).toHaveTextContaining("SAVE LOGS IN A FILE");
    await expect(
      await SettingsDeveloperScreen.saveLogsDescription
    ).toHaveTextContaining(
      "Enabling this option, logs will be saved in a file and will be persistent."
    );
  });

  // Needs rework to add scroll down step to the Save Logs button
  xit("Settings Developer - Enable Developer Mode and Save Logs switches", async () => {
    // Click on DEVELOPER MODE and SAVE LOGS IN FILE switches to activate the options
    await SettingsDeveloperScreen.clickOnDeveloperMode();

    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switches have now value = '1' (active)
    await expect(
      await SettingsDeveloperScreen.developerModeControllerValue
    ).toHaveAttrContaining("Toggle.ToggleState", "1");
    await expect(
      await SettingsDeveloperScreen.saveLogsControllerValue
    ).toHaveAttrContaining("Toggle.ToggleState", "1");
  });

  // Needs rework to add scroll down step to the Save Logs button
  xit("Settings Developer - Disable Developer Mode and Save Logs switches", async () => {
    // Click on DEVELOPER MODE and SAVE LOGS IN FILE switches to disable the options

    await SettingsDeveloperScreen.clickOnDeveloperMode();

    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switches have now value = '0' (disabled)
    await expect(
      await SettingsDeveloperScreen.developerModeControllerValue
    ).toHaveAttrContaining("Toggle.ToggleState", "0");
    await expect(
      await SettingsDeveloperScreen.saveLogsControllerValue
    ).toHaveAttrContaining("Toggle.ToggleState", "0");
  });

  it("Settings Developer - Open codebase button", async () => {
    await SettingsDeveloperScreen.clickOnOpenCodebase();
    await SettingsDeveloperScreen.returnToApp();
  });

  // Skipped because it needs the aria label fixed for test notifications button
  xit("Settings Developer - Click on Test Notification button", async () => {
    await SettingsDeveloperScreen.clickOnTestNotifications();
  });

  // Skipped for now because it is failing on CI - Needs research
  xit("Settings Developer - Open folder button", async () => {
    await SettingsDeveloperScreen.clickOnOpenCache();
    await SettingsDeveloperScreen.returnToApp();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Setings Developer - Compress & Download Cache", async () => {
    await SettingsDeveloperScreen.clickOnCompressAndDownloadCache();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Setings Developer - Clear Cache", async () => {
    await SettingsDeveloperScreen.clickOnClearCache();
  });
});
