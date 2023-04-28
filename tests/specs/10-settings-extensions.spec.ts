import SettingsExtensionsScreen from "../screenobjects/SettingsExtensionsScreen";
import SettingsFilesScreen from "../screenobjects/SettingsFilesScreen";

export default async function settingsExtensions() {
  it("Settings Extensions - Validate that buttons are displayed in front", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsFilesScreen.goToExtensionsSettings();
    await SettingsExtensionsScreen.waitForIsShown(true);

    // Validate that the three buttons are displayed on top of the screen
    await expect(SettingsExtensionsScreen.installedButton).toBeDisplayed();
    await expect(SettingsExtensionsScreen.exploreButton).toBeDisplayed();
    await expect(
      SettingsExtensionsScreen.extensionsSettingsButton
    ).toBeDisplayed();
  });

  it("Settings Extensions - Go to Explore panel and assert contents", async () => {
    // Go to Explore Extensions
    await SettingsExtensionsScreen.clickOnExploreButton();

    // Validate warning message, search extensions header and input are displayed
    await expect(
      SettingsExtensionsScreen.installedAlertText
    ).toHaveTextContaining(
      "Extensions are pre-compiled on external hardware. For added security you can compile extensions from source and place in the `extensions` folder."
    );
    await expect(
      SettingsExtensionsScreen.extensionsSearchHeader
    ).toHaveTextContaining("SEARCH EXTENSIONS");
    await expect(
      SettingsExtensionsScreen.extensionsSearchInput
    ).toBeDisplayed();
    const placeholder =
      await SettingsExtensionsScreen.getPlaceholderFromExtensionsInput();
    await expect(placeholder).toEqual("Extension name or description.");
  });

  it("Settings Extensions - Go to Settings panel and assert contents", async () => {
    // Click on Settings button and go to Settings panel
    await SettingsExtensionsScreen.clickOnExtensionsSettingsButton();

    // Assert contents from screen
    await expect(
      SettingsExtensionsScreen.openExtensionsHeaderText
    ).toHaveTextContaining("OPEN EXTENSIONS FOLDER");
    await expect(
      SettingsExtensionsScreen.openExtensionsDescriptionText
    ).toHaveTextContaining(
      "Open the local directory containing your installed extensions."
    );
    await expect(
      SettingsExtensionsScreen.enableAutomaticallyHeader
    ).toHaveTextContaining("ENABLE AUTOMATICALLY");
    await expect(
      SettingsExtensionsScreen.enableAutomaticallyDescription
    ).toHaveTextContaining(
      "When turned on, new extensions will automatically be enabled by default."
    );
  });

  it("Settings Extensions - Activate the switch slider for Enable Automatically", async () => {
    // Click on Switch from Enable Automatically to activate it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '1' (active)
    const toggleElement =
      await SettingsExtensionsScreen.enableAutomaticallyControllerValue;
    const enableAutomaticallyState =
      await SettingsExtensionsScreen.getToggleState(toggleElement);

    await expect(enableAutomaticallyState).toEqual("1");
  });

  it("Settings Extensions - Deactivate the switch slider for Enable Automatically", async () => {
    // Click again on Switch from Enable Automatically to disable it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '0' (disabled)
    const toggleElement =
      await SettingsExtensionsScreen.enableAutomaticallyControllerValue;
    const enableAutomaticallyState =
      await SettingsExtensionsScreen.getToggleState(toggleElement);

    await expect(enableAutomaticallyState).toEqual("0");
  });

  // Skipped since it needs research on how to close external window from Explorer before proceeding with next tests
  xit("Settings Extensions - Open Extensions Folder", async () => {
    await SettingsExtensionsScreen.clickOnOpenExtensionsFolder();
  });
}
