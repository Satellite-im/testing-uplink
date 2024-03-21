require("module-alias/register");
import SettingsAudioScreen from "@screenobjects/settings/SettingsAudioScreen";
import SettingsExtensionsScreen from "@screenobjects/settings/SettingsExtensionsScreen";

export default async function settingsExtensionsTests() {
  it("Settings Extensions - Validate that buttons are displayed in front", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsAudioScreen.goToExtensionsSettings();
    await SettingsExtensionsScreen.waitForIsShown(true);

    // Validate that the three buttons are displayed on top of the screen
    await SettingsExtensionsScreen.installedButton.waitForExist();
    await SettingsExtensionsScreen.exploreButton.waitForExist();
    await SettingsExtensionsScreen.extensionsSettingsButton.waitForExist();
  });

  it("Settings Extensions - Validate Emoji Selector extension contents", async () => {
    const emojiSelectorTitle =
      await SettingsExtensionsScreen.emojiSelectorTitle;
    const emojiSelectorDeveloper =
      await SettingsExtensionsScreen.emojiSelectorDeveloper;
    const emojiSelectorDescription =
      await SettingsExtensionsScreen.emojiSelectorDescription;

    await expect(emojiSelectorTitle).toHaveText("Emoji Selector");
    await expect(emojiSelectorDeveloper).toHaveText(
      "SATELLITE <DEVS@SATELLITE.IM>",
    );
    await expect(emojiSelectorDescription).toHaveText(
      "Browse the standard unicode library of emoji's and send them to friends.",
    );
  });

  it("Settings Extensions - Disable Emoji Selector extension", async () => {
    // Click again on Switch from Emoji Selector to deactivate it
    await SettingsExtensionsScreen.clickOnEmojiSelectorCheckbox();

    // Validate that switch from Emoji Selector now has value = '0' (disabled)
    await SettingsExtensionsScreen.validateEmojiSelectorIsDisabled();
  });

  it("Settings Extensions - Enable Emoji Selector extension", async () => {
    // Click on Switch from Emoji Selector to activate it
    await SettingsExtensionsScreen.clickOnEmojiSelectorCheckbox();

    // Validate that switch from Emoji Selector now has value = '1' (active)
    await SettingsExtensionsScreen.validateEmojiSelectorIsEnabled();
  });

  it("Settings Extensions - Go to Explore panel and assert contents", async () => {
    // Go to Explore Extensions
    await SettingsExtensionsScreen.clickOnExploreButton();

    // Validate warning message, search extensions header and input are displayed
    const installedAlertText =
      await SettingsExtensionsScreen.installedAlertText;
    await expect(installedAlertText).toHaveText(
      "Extensions are pre-compiled on external hardware. For added security you can compile extensions from source and place in the `extensions` folder.",
    );

    const extensionsSearchHeader =
      await SettingsExtensionsScreen.extensionsSearchHeader;
    await expect(extensionsSearchHeader).toHaveText("SEARCH EXTENSIONS");

    await SettingsExtensionsScreen.extensionsSearchInput.waitForExist();
    const placeholder =
      await SettingsExtensionsScreen.getPlaceholderFromExtensionsInput();
    await expect(placeholder).toEqual("Extension name or description.");
  });

  it("Settings Extensions - Go to Settings panel and assert contents", async () => {
    // Click on Settings button and go to Settings panel
    await SettingsExtensionsScreen.clickOnExtensionsSettingsButton();

    // Assert contents from screen
    const openExtensionsHeader =
      await SettingsExtensionsScreen.openExtensionsHeaderText;
    await expect(openExtensionsHeader).toHaveText("OPEN EXTENSIONS FOLDER");

    const openExtensionsDescription =
      await SettingsExtensionsScreen.openExtensionsDescriptionText;
    await expect(openExtensionsDescription).toHaveText(
      "Open the local directory containing your installed extensions.",
    );

    const enableAutomaticallyHeader =
      await SettingsExtensionsScreen.enableAutomaticallyHeader;
    await expect(enableAutomaticallyHeader).toHaveText("ENABLE AUTOMATICALLY");

    const enableAutomaticallyDescription =
      await SettingsExtensionsScreen.enableAutomaticallyDescription;
    await expect(enableAutomaticallyDescription).toHaveText(
      "When turned on, new extensions will automatically be enabled by default.",
    );
  });

  it("Settings Extensions - Activate the switch slider for Enable Automatically", async () => {
    // Click on Switch from Enable Automatically to activate it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '1' (active)
    await SettingsExtensionsScreen.validateEnableAutomaticallyIsEnabled();
  });

  it("Settings Extensions - Deactivate the switch slider for Enable Automatically", async () => {
    // Click again on Switch from Enable Automatically to disable it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '0' (disabled)
    await SettingsExtensionsScreen.validateEnableAutomaticallyIsDisabled();
  });

  // Skipped since it needs research on how to close external window from Explorer before proceeding with next tests
  xit("Settings Extensions - Open Extensions Folder", async () => {
    await SettingsExtensionsScreen.clickOnOpenExtensionsFolder();
  });
}
