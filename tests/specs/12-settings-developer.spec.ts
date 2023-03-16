import SettingsDeveloperScreen from "../screenobjects/SettingsDeveloperScreen";
import SettingsNotificationsScreen from "../screenobjects/SettingsNotificationsScreen";

export default async function settingsDeveloper() {
  it("Settings Developer - Validate headers and descriptions from Settings Sections", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsNotificationsScreen.goToDeveloperSettings();
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

    // Validate PRINT STATE section
    await expect(
      await SettingsDeveloperScreen.printStateHeader
    ).toHaveTextContaining("PRINT STATE");
    await expect(
      await SettingsDeveloperScreen.printStateDescription
    ).toHaveTextContaining("Display State in the debug logger");

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

  it("Settings Developer - Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to activate the option
    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switch has now value = '1' (active)
    const saveLogsStatus = await SettingsDeveloperScreen.getToggleState(
      await SettingsDeveloperScreen.saveLogsControllerValue
    );
    expect(saveLogsStatus).toEqual("1");
  });

  it("Settings Developer - Disable Save Logs switch", async () => {
    // Click on SAVE LOGS IN FILE switch to disable the option
    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switch has now value = '0' (disabled)
    const saveLogsStatus = await SettingsDeveloperScreen.getToggleState(
      await SettingsDeveloperScreen.saveLogsControllerValue
    );
    expect(saveLogsStatus).toEqual("0");
  });

  it("Settings Developer - Enable Developer Mode", async () => {
    // Click on DEVELOPER MODE switch to activate the option
    await SettingsDeveloperScreen.clickOnDeveloperMode();

    // Validate that switch has now value = '1' (active)
    const developerModeStatus = await SettingsDeveloperScreen.getToggleState(
      await SettingsDeveloperScreen.developerModeControllerValue
    );
    expect(developerModeStatus).toEqual("1");
  });

  it("Settings Developer - Disable Developer Mode switch", async () => {
    // Click on DEVELOPER MODE switch to disable the option
    await SettingsDeveloperScreen.clickOnDeveloperMode();

    // Validate that switch has now value = '0' (disabled)
    const developerModeStatus = await SettingsDeveloperScreen.getToggleState(
      await SettingsDeveloperScreen.developerModeControllerValue
    );
    expect(developerModeStatus).toEqual("0");
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
  xit("Settings Developer - Compress & Download Cache", async () => {
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
