require("module-alias/register");
import SettingsDeveloperScreen from "@screenobjects/settings/SettingsDeveloperScreen";
import SettingsLicensesScreen from "@screenobjects/settings/SettingsLicenses";
const settingsDeveloper = new SettingsDeveloperScreen();
const settingsLicenses = new SettingsLicensesScreen();

export default async function settingsDeveloperTests() {
  it("Settings Developer - Validate headers and descriptions from Settings Sections", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsLicenses.goToDeveloperSettings();
    await settingsDeveloper.waitForIsShown(true);

    // Validate EXPERIMENTAL FEATURES section
    const experimentalHeader =
      await settingsDeveloper.experimentalFeaturesHeader;
    const experimentalDescription =
      await settingsDeveloper.experimentalFeaturesDescription;
    await expect(experimentalHeader).toHaveTextContaining(
      "EXPERIMENTAL FEATURES",
    );
    await expect(experimentalDescription).toHaveTextContaining(
      "Enables features which may be incomplete or non-functional.",
    );

    // Validate DEVELOPER MODE section
    const developerModeHeader = await settingsDeveloper.developerModeHeader;
    const developerModeDescription =
      await settingsDeveloper.developerModeDescription;
    await expect(developerModeHeader).toHaveTextContaining("DEVELOPER MODE");
    await expect(developerModeDescription).toHaveTextContaining(
      "Enabling developer mode adds logging and displays helpful debug information on the UI.",
    );

    // Validate TEST NOTIFICATION section
    const testNotificationHeader =
      await settingsDeveloper.testNotificationHeader;
    const testNotificationDescription =
      await settingsDeveloper.testNotificationDescription;
    await expect(testNotificationHeader).toHaveTextContaining(
      "TEST NOTIFICATION",
    );
    await expect(testNotificationDescription).toHaveTextContaining(
      "Sends a test notification",
    );

    // Validate OPEN CACHE section
    const openCacheHeader = await settingsDeveloper.openCacheHeader;
    const openCacheDescription = await settingsDeveloper.openCacheDescription;
    await expect(openCacheHeader).toHaveTextContaining("OPEN CACHE");
    await expect(openCacheDescription).toHaveTextContaining(
      "Open the cache in your default file browser.",
    );

    // Validate COMPRESS & DOWNLOAD CACHE section
    const compressAndDownloadHeader =
      await settingsDeveloper.compressAndDownloadCacheHeader;
    const compressAndDownloadDescription =
      await settingsDeveloper.compressAndDownloadCacheDescription;
    await expect(compressAndDownloadHeader).toHaveTextContaining(
      "COMPRESS & DOWNLOAD CACHE",
    );
    await expect(compressAndDownloadDescription).toHaveTextContaining(
      "For debugging with other developers, you can compress your cache to zip and share it. Don't do this if this is a real account you use.",
    );

    // Validate PRINT STATE section
    const printStateHeader = await settingsDeveloper.printStateHeader;
    const printStateDescription = await settingsDeveloper.printStateDescription;
    await expect(printStateHeader).toHaveTextContaining("PRINT STATE");
    await expect(printStateDescription).toHaveTextContaining(
      "Display State in the debug logger",
    );

    // Validate CLEAR CACHE section
    const clearCacheHeader = await settingsDeveloper.clearCacheHeader;
    const clearCacheDescription = await settingsDeveloper.clearCacheDescription;
    await expect(clearCacheHeader).toHaveTextContaining("CLEAR CACHE");
    await expect(clearCacheDescription).toHaveTextContaining(
      "Reset your account, basically.",
    );

    // Validate SAVE LOGS IN A FILE section
    const saveLogsHeader = await settingsDeveloper.saveLogsHeader;
    const saveLogsDescription = await settingsDeveloper.saveLogsDescription;
    await expect(saveLogsHeader).toHaveTextContaining("SAVE LOGS IN A FILE");
    await expect(saveLogsDescription).toHaveTextContaining(
      "Enabling this option, logs will be saved in a file and will be persistent.",
    );
  });

  it("Settings Developer - Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to activate the option
    await settingsDeveloper.clickOnSaveLogs();

    // Validate that switch has now value = '1' (active)
    await settingsDeveloper.validateSaveLogsIsEnabled();
  });

  // Skipped due to failure on app when disabling the switch the app crashes
  xit("Settings Developer - Disable Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to disable the option
    await settingsDeveloper.clickOnSaveLogs();

    // Validate that switch has now value = '0' (disabled)
    await settingsDeveloper.validateSaveLogsIsDisabled();
  });

  // Test skipped since it fails on Windows CI
  xit("Settings Developer - Enable Developer Mode", async () => {
    // Click on DEVELOPER MODE switch to activate the option
    await settingsDeveloper.clickOnDeveloperMode();

    // Validate that switch has now value = '1' (active)
    await settingsDeveloper.validateDeveloperModeIsEnabled();
  });

  // Test skipped since it fails on Windows CI
  xit("Settings Developer - Disable Developer Mode switch", async () => {
    // Click on DEVELOPER MODE switch to disable the option
    await settingsDeveloper.clickOnDeveloperMode();

    // Validate that switch has now value = '0' (disabled)
    await settingsDeveloper.validateDeveloperModeIsDisabled();
  });

  // Skipped because it needs the aria label fixed for test notifications button
  xit("Settings Developer - Click on Test Notification button", async () => {
    await settingsDeveloper.clickOnTestNotifications();
  });

  // Skipped for now because it is failing on CI - Needs research
  xit("Settings Developer - Open folder button", async () => {
    await settingsDeveloper.clickOnOpenCache();
    await settingsDeveloper.returnToApp();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Settings Developer - Compress and Download Cache", async () => {
    await settingsDeveloper.clickOnCompressAndDownloadCache();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Settings Developer - Print State button", async () => {
    await settingsDeveloper.clickOnPrintState();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Settings Developer - Clear Cache", async () => {
    await settingsDeveloper.clickOnClearCache();
  });
}
