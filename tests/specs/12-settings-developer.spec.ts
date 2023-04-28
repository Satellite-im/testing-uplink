import SettingsDeveloperScreen from "../screenobjects/SettingsDeveloperScreen";
import SettingsNotificationsScreen from "../screenobjects/SettingsNotificationsScreen";

export default async function settingsDeveloper() {
  it("Settings Developer - Validate headers and descriptions from Settings Sections", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsNotificationsScreen.goToDeveloperSettings();
    await SettingsDeveloperScreen.waitForIsShown(true);

    // Validate DEVELOPER MODE section
    await expect(
      SettingsDeveloperScreen.developerModeHeader
    ).toHaveTextContaining("DEVELOPER MODE");
    await expect(
      SettingsDeveloperScreen.developerModeDescription
    ).toHaveTextContaining(
      "Enabling developer mode adds logging and displays helpful debug information on the UI."
    );

    // Validate TEST NOTIFICATION section
    await expect(
      SettingsDeveloperScreen.testNotificationHeader
    ).toHaveTextContaining("TEST NOTIFICATION");
    await expect(
      SettingsDeveloperScreen.testNotificationDescription
    ).toHaveTextContaining("Sends a test notification");

    // Validate OPEN CACHE section
    await expect(SettingsDeveloperScreen.openCacheHeader).toHaveTextContaining(
      "OPEN CACHE"
    );
    await expect(
      SettingsDeveloperScreen.openCacheDescription
    ).toHaveTextContaining("Open the cache in your default file browser.");

    // Validate COMPRESS & DOWNLOAD CACHE section
    await expect(
      SettingsDeveloperScreen.compressAndDownloadCacheHeader
    ).toHaveTextContaining("COMPRESS & DOWNLOAD CACHE");
    await expect(
      SettingsDeveloperScreen.compressAndDownloadCacheDescription
    ).toHaveTextContaining(
      "For debugging with other developers, you can compress your cache to zip and share it. Don't do this if this is a real account you use."
    );

    // Validate PRINT STATE section
    await expect(SettingsDeveloperScreen.printStateHeader).toHaveTextContaining(
      "PRINT STATE"
    );
    await expect(
      SettingsDeveloperScreen.printStateDescription
    ).toHaveTextContaining("Display State in the debug logger");

    // Validate CLEAR CACHE section
    await expect(SettingsDeveloperScreen.clearCacheHeader).toHaveTextContaining(
      "CLEAR CACHE"
    );
    await expect(
      SettingsDeveloperScreen.clearCacheDescription
    ).toHaveTextContaining("Reset your account, basically.");

    // Validate SAVE LOGS IN A FILE section
    await expect(SettingsDeveloperScreen.saveLogsHeader).toHaveTextContaining(
      "SAVE LOGS IN A FILE"
    );
    await expect(
      SettingsDeveloperScreen.saveLogsDescription
    ).toHaveTextContaining(
      "Enabling this option, logs will be saved in a file and will be persistent."
    );
  });

  it("Settings Developer - Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to activate the option
    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switch has now value = '1' (active)
    const toggleElement = await SettingsDeveloperScreen.saveLogsControllerValue;
    const saveLogsStatus = await SettingsDeveloperScreen.getToggleState(
      toggleElement
    );
    await expect(saveLogsStatus).toEqual("1");
  });

  // Skipped due to failure on app when disabling the switch the app crashes
  xit("Settings Developer - Disable Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to disable the option
    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switch has now value = '0' (disabled)
    const toggleElement = await SettingsDeveloperScreen.saveLogsControllerValue;
    const saveLogsStatus = await SettingsDeveloperScreen.getToggleState(
      toggleElement
    );
    await expect(saveLogsStatus).toEqual("0");
  });

  // Test skipped since it fails on Windows CI
  xit("Settings Developer - Enable Developer Mode", async () => {
    // Click on DEVELOPER MODE switch to activate the option
    await SettingsDeveloperScreen.clickOnDeveloperMode();

    // Validate that switch has now value = '1' (active)
    const toggleElement =
      await SettingsDeveloperScreen.developerModeControllerValue;
    const developerModeStatus = await SettingsDeveloperScreen.getToggleState(
      toggleElement
    );
    await expect(developerModeStatus).toEqual("1");
  });

  // Test skipped since it fails on Windows CI
  xit("Settings Developer - Disable Developer Mode switch", async () => {
    // Click on DEVELOPER MODE switch to disable the option
    await SettingsDeveloperScreen.clickOnDeveloperMode();

    // Validate that switch has now value = '0' (disabled)
    const toggleElement =
      await SettingsDeveloperScreen.developerModeControllerValue;
    const developerModeStatus = await SettingsDeveloperScreen.getToggleState(
      toggleElement
    );
    await expect(developerModeStatus).toEqual("0");
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
}
