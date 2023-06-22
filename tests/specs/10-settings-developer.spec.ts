import SettingsDeveloperScreen from "../screenobjects/settings/SettingsDeveloperScreen";
import SettingsNotificationsScreen from "../screenobjects/settings/SettingsNotificationsScreen";
let settingsDeveloperFirstUser = new SettingsDeveloperScreen("userA");
let settingsNotificationsFirstUser = new SettingsNotificationsScreen("userA");

export default async function settingsDeveloper() {
  it("Settings Developer - Validate headers and descriptions from Settings Sections", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsNotificationsFirstUser.goToDeveloperSettings();
    await settingsDeveloperFirstUser.waitForIsShown(true);

    // Validate DEVELOPER MODE section
    await expect(
      settingsDeveloperFirstUser.developerModeHeader
    ).toHaveTextContaining("DEVELOPER MODE");
    await expect(
      settingsDeveloperFirstUser.developerModeDescription
    ).toHaveTextContaining(
      "Enabling developer mode adds logging and displays helpful debug information on the UI."
    );

    // Validate TEST NOTIFICATION section
    await expect(
      settingsDeveloperFirstUser.testNotificationHeader
    ).toHaveTextContaining("TEST NOTIFICATION");
    await expect(
      settingsDeveloperFirstUser.testNotificationDescription
    ).toHaveTextContaining("Sends a test notification");

    // Validate OPEN CACHE section
    await expect(
      settingsDeveloperFirstUser.openCacheHeader
    ).toHaveTextContaining("OPEN CACHE");
    await expect(
      settingsDeveloperFirstUser.openCacheDescription
    ).toHaveTextContaining("Open the cache in your default file browser.");

    // Validate COMPRESS & DOWNLOAD CACHE section
    await expect(
      settingsDeveloperFirstUser.compressAndDownloadCacheHeader
    ).toHaveTextContaining("COMPRESS & DOWNLOAD CACHE");
    await expect(
      settingsDeveloperFirstUser.compressAndDownloadCacheDescription
    ).toHaveTextContaining(
      "For debugging with other developers, you can compress your cache to zip and share it. Don't do this if this is a real account you use."
    );

    // Validate PRINT STATE section
    await expect(
      settingsDeveloperFirstUser.printStateHeader
    ).toHaveTextContaining("PRINT STATE");
    await expect(
      settingsDeveloperFirstUser.printStateDescription
    ).toHaveTextContaining("Display State in the debug logger");

    // Validate CLEAR CACHE section
    await expect(
      settingsDeveloperFirstUser.clearCacheHeader
    ).toHaveTextContaining("CLEAR CACHE");
    await expect(
      settingsDeveloperFirstUser.clearCacheDescription
    ).toHaveTextContaining("Reset your account, basically.");

    // Validate SAVE LOGS IN A FILE section
    await expect(
      settingsDeveloperFirstUser.saveLogsHeader
    ).toHaveTextContaining("SAVE LOGS IN A FILE");
    await expect(
      settingsDeveloperFirstUser.saveLogsDescription
    ).toHaveTextContaining(
      "Enabling this option, logs will be saved in a file and will be persistent."
    );
  });

  it("Settings Developer - Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to activate the option
    await settingsDeveloperFirstUser.clickOnSaveLogs();

    // Validate that switch has now value = '1' (active)
    const toggleElement =
      await settingsDeveloperFirstUser.saveLogsControllerValue;
    const saveLogsStatus = await settingsDeveloperFirstUser.getToggleState(
      toggleElement
    );
    await expect(saveLogsStatus).toEqual("1");
  });

  // Skipped due to failure on app when disabling the switch the app crashes
  xit("Settings Developer - Disable Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to disable the option
    await settingsDeveloperFirstUser.clickOnSaveLogs();

    // Validate that switch has now value = '0' (disabled)
    const toggleElement =
      await settingsDeveloperFirstUser.saveLogsControllerValue;
    const saveLogsStatus = await settingsDeveloperFirstUser.getToggleState(
      toggleElement
    );
    await expect(saveLogsStatus).toEqual("0");
  });

  // Test skipped since it fails on Windows CI
  xit("Settings Developer - Enable Developer Mode", async () => {
    // Click on DEVELOPER MODE switch to activate the option
    await settingsDeveloperFirstUser.clickOnDeveloperMode();

    // Validate that switch has now value = '1' (active)
    const toggleElement =
      await settingsDeveloperFirstUser.developerModeControllerValue;
    const developerModeStatus = await settingsDeveloperFirstUser.getToggleState(
      toggleElement
    );
    await expect(developerModeStatus).toEqual("1");
  });

  // Test skipped since it fails on Windows CI
  xit("Settings Developer - Disable Developer Mode switch", async () => {
    // Click on DEVELOPER MODE switch to disable the option
    await settingsDeveloperFirstUser.clickOnDeveloperMode();

    // Validate that switch has now value = '0' (disabled)
    const toggleElement =
      await settingsDeveloperFirstUser.developerModeControllerValue;
    const developerModeStatus = await settingsDeveloperFirstUser.getToggleState(
      toggleElement
    );
    await expect(developerModeStatus).toEqual("0");
  });

  // Skipped because it needs the aria label fixed for test notifications button
  xit("Settings Developer - Click on Test Notification button", async () => {
    await settingsDeveloperFirstUser.clickOnTestNotifications();
  });

  // Skipped for now because it is failing on CI - Needs research
  xit("Settings Developer - Open folder button", async () => {
    await settingsDeveloperFirstUser.clickOnOpenCache();
    await settingsDeveloperFirstUser.returnToApp();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Settings Developer - Compress and Download Cache", async () => {
    await settingsDeveloperFirstUser.clickOnCompressAndDownloadCache();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Settings Developer - Print State button", async () => {
    await settingsDeveloperFirstUser.clickOnPrintState();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Settings Developer - Clear Cache", async () => {
    await settingsDeveloperFirstUser.clickOnClearCache();
  });
}
