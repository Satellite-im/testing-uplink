require("module-alias/register");
import { MACOS_DRIVER } from "@helpers/constants";
import { sendCustomKeybinds } from "@helpers/commands";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import SettingsDeveloperScreen from "@screenobjects/settings/SettingsDeveloperScreen";
import SettingsLicensesScreen from "@screenobjects/settings/SettingsLicenses";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WebInspector from "@screenobjects/developer/WebInspector";

export default async function settingsDeveloperTests() {
  it("Settings Developer - Validate headers and descriptions from Settings Sections", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsLicensesScreen.goToDeveloperSettings();
    await SettingsDeveloperScreen.waitForIsShown(true);

    // Validate EXPERIMENTAL FEATURES section
    const experimentalHeader =
      await SettingsDeveloperScreen.experimentalFeaturesHeader;
    const experimentalDescription =
      await SettingsDeveloperScreen.experimentalFeaturesDescription;
    await expect(experimentalHeader).toHaveText("EXPERIMENTAL FEATURES");
    await expect(experimentalDescription).toHaveText(
      "Enables features which may be incomplete or non-functional.",
    );

    // Validate DEVELOPER MODE section
    const developerModeHeader =
      await SettingsDeveloperScreen.developerModeHeader;
    const developerModeDescription =
      await SettingsDeveloperScreen.developerModeDescription;
    await expect(developerModeHeader).toHaveText("DEVELOPER MODE");
    await expect(developerModeDescription).toHaveText(
      "Enabling developer mode adds logging and displays helpful debug information on the UI.",
    );

    // Validate TEST NOTIFICATION section
    const testNotificationHeader =
      await SettingsDeveloperScreen.testNotificationHeader;
    const testNotificationDescription =
      await SettingsDeveloperScreen.testNotificationDescription;
    await expect(testNotificationHeader).toHaveText("TEST NOTIFICATION");
    await expect(testNotificationDescription).toHaveText(
      "Sends a test notification.",
    );

    // Validate OPEN CACHE section
    const openCacheHeader = await SettingsDeveloperScreen.openCacheHeader;
    const openCacheDescription =
      await SettingsDeveloperScreen.openCacheDescription;
    await expect(openCacheHeader).toHaveText("OPEN CACHE");
    await expect(openCacheDescription).toHaveText(
      "Open the cache in your default file browser.",
    );

    // Validate COMPRESS & DOWNLOAD CACHE section
    const compressAndDownloadHeader =
      await SettingsDeveloperScreen.compressAndDownloadCacheHeader;
    const compressAndDownloadDescription =
      await SettingsDeveloperScreen.compressAndDownloadCacheDescription;
    await expect(compressAndDownloadHeader).toHaveText(
      "COMPRESS & DOWNLOAD CACHE",
    );
    await expect(compressAndDownloadDescription).toHaveText(
      "For debugging with other developers, you can compress your cache to zip and share it. Don't do this if this is a real account you use.",
    );

    // Validate PRINT STATE section
    const printStateHeader = await SettingsDeveloperScreen.printStateHeader;
    const printStateDescription =
      await SettingsDeveloperScreen.printStateDescription;
    await expect(printStateHeader).toHaveText("PRINT STATE");
    await expect(printStateDescription).toHaveText(
      "Display State in the debug logger.",
    );

    // Validate CLEAR CACHE section
    const clearCacheHeader = await SettingsDeveloperScreen.clearCacheHeader;
    const clearCacheDescription =
      await SettingsDeveloperScreen.clearCacheDescription;
    await expect(clearCacheHeader).toHaveText("CLEAR CACHE");
    await expect(clearCacheDescription).toHaveText(
      "Reset your account, basically.",
    );

    // Validate SAVE LOGS IN A FILE section
    const saveLogsHeader = await SettingsDeveloperScreen.saveLogsHeader;
    const saveLogsDescription =
      await SettingsDeveloperScreen.saveLogsDescription;
    await expect(saveLogsHeader).toHaveText("SAVE LOGS IN A FILE");
    await expect(saveLogsDescription).toHaveText(
      "Enabling this option, logs will be saved in a file and will be persistent.",
    );
  });

  it("Settings Developer - Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to activate the option
    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switch has now value = '1' (active)
    await SettingsDeveloperScreen.validateSaveLogsIsEnabled();
  });

  // Skipped due to failure on app when disabling the switch the app crashes
  xit("Settings Developer - Disable Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to disable the option
    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switch has now value = '0' (disabled)
    await SettingsDeveloperScreen.validateSaveLogsIsDisabled();
  });

  it("Settings Developer - Enable Developer Mode", async () => {
    // Click on DEVELOPER MODE switch to activate the option
    await SettingsDeveloperScreen.clickOnDeveloperMode();

    // Validate that switch has now value = '1' (active)
    await SettingsDeveloperScreen.validateDeveloperModeIsEnabled();
  });

  // Test skipped since it fails on Windows CI
  xit("Settings Developer - Disable Developer Mode switch", async () => {
    // Click on DEVELOPER MODE switch to disable the option
    await SettingsDeveloperScreen.clickOnDeveloperMode();

    // Validate that switch has now value = '0' (disabled)
    await SettingsDeveloperScreen.validateDeveloperModeIsDisabled();
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
  xit("Settings Developer - Compress and Download Cache", async () => {
    await SettingsDeveloperScreen.clickOnCompressAndDownloadCache();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Settings Developer - Print State button", async () => {
    await SettingsDeveloperScreen.clickOnPrintState();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Settings Developer - Clear Cache", async () => {
    await SettingsDeveloperScreen.clickOnClearCache();
  });

  it("User can open Web Inspector from Context Menu", async () => {
    // Execute this test only on MacOS - Web Inspector cannot be closed with Keybind on Windows
    const currentDriver = await SettingsDeveloperScreen.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Go to Friends Screen and open Web Inspector from Add User Input Context Menu
      await SettingsDeveloperScreen.goToFriends();
      await FriendsScreen.waitForIsShown(true);
      await FriendsScreen.openAddSomeoneContextMenu();
      await FriendsScreen.clickOnOpenWebInspector();

      // Validate Web Inspector is displayed
      await WebInspector.validateWebInspectorIsShown();

      // Press Ctrl + Shift + I to Close Web Inspector
      await sendCustomKeybinds(103, 86, 57);

      // Validate Web Inspector is not displayed
      await WebInspector.validateWebInspectorIsNotShown();

      // Return to Settings Developer Screen
      await FriendsScreen.goToSettings();
      await SettingsProfileScreen.goToDeveloperSettings();
      await SettingsDeveloperScreen.waitForIsShown(true);
    }
  });
}
