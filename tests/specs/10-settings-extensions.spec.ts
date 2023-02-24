import SettingsExtensionsScreen from "../screenobjects/SettingsExtensionsScreen";
import SettingsFilesScreen from "../screenobjects/SettingsFilesScreen";

export default async function settingsExtensions() {
  it("Settings Extensions - Validate texts from Extension Placeholder", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsFilesScreen.goToExtensionsSettings();
    await SettingsExtensionsScreen.waitForIsShown(true);

    // Start validations
    await expect(
      await SettingsExtensionsScreen.enableAutomaticallyHeader
    ).toHaveTextContaining("ENABLE AUTOMATICALLY");

    await expect(
      await SettingsExtensionsScreen.enableAutomaticallyDescription
    ).toHaveTextContaining(
      "When turned on, new extensions will automatically be enabled by default."
    );
  });

  it("Settings Extensions - Activate the switch slider for Enable Automatically", async () => {
    // Click on Switch from Enable Automatically to activate it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '1' (active)
    const enableAutomaticallyState =
      await SettingsExtensionsScreen.getToggleState(
        await SettingsExtensionsScreen.enableAutomaticallyControllerValue
      );

    expect(enableAutomaticallyState).toEqual("1");
  });

  it("Settings Extensions - Deactivate the switch slider for Enable Automatically", async () => {
    // Click again on Switch from Enable Automatically to disable it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '0' (disabled)
    const enableAutomaticallyState =
      await SettingsExtensionsScreen.getToggleState(
        await SettingsExtensionsScreen.enableAutomaticallyControllerValue
      );

    expect(enableAutomaticallyState).toEqual("0");
  });

  // Skipped since it needs research on how to close external window from Explorer before proceeding with next tests
  xit("Settings Extensions - Open Extensions Folder", async () => {
    await SettingsExtensionsScreen.clickOnOpenExtensionsFolder();
  });
}
