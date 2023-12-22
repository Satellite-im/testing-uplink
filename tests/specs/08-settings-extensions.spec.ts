require("module-alias/register");
import SettingsAudioScreen from "@screenobjects/settings/SettingsAudioScreen";
import SettingsExtensionsScreen from "@screenobjects/settings/SettingsExtensionsScreen";
const settingsAudio = new SettingsAudioScreen();
const settingsExtensions = new SettingsExtensionsScreen();

export default async function settingsExtensionsTests() {
  it("Settings Extensions - Validate that buttons are displayed in front", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsAudio.goToExtensionsSettings();
    await settingsExtensions.waitForIsShown(true);

    // Validate that the three buttons are displayed on top of the screen
    await settingsExtensions.installedButton.waitForExist();
    await settingsExtensions.exploreButton.waitForExist();
    await settingsExtensions.extensionsSettingsButton.waitForExist();
  });

  it("Settings Extensions - Validate Emoji Selector extension contents", async () => {
    const emojiSelectorTitle = await settingsExtensions.emojiSelectorTitle;
    const emojiSelectorDeveloper =
      await settingsExtensions.emojiSelectorDeveloper;
    const emojiSelectorDescription =
      await settingsExtensions.emojiSelectorDescription;

    await expect(emojiSelectorTitle).toHaveTextContaining("Emoji Selector");
    await expect(emojiSelectorDeveloper).toHaveTextContaining(
      "SATELLITE <DEVS@SATELLITE.IM>",
    );
    await expect(emojiSelectorDescription).toHaveTextContaining(
      "Browse the standard unicode library of emoji's and send them to friends.",
    );
  });

  it("Settings Extensions - Disable Emoji Selector extension", async () => {
    // Click again on Switch from Emoji Selector to deactivate it
    await settingsExtensions.clickOnEmojiSelectorCheckbox();

    // Validate that switch from Emoji Selector now has value = '0' (disabled)
    const toggleElement = await settingsExtensions.emojiSelectorCheckboxValue;
    const emojiSelectorState =
      await settingsExtensions.getToggleState(toggleElement);
    await expect(emojiSelectorState).toEqual("0");
  });

  it("Settings Extensions - Enable Emoji Selector extension", async () => {
    // Click on Switch from Emoji Selector to activate it
    await settingsExtensions.clickOnEmojiSelectorCheckbox();

    // Validate that switch from Emoji Selector now has value = '1' (active)
    const toggleElement = await settingsExtensions.emojiSelectorCheckboxValue;
    const emojiSelectorState =
      await settingsExtensions.getToggleState(toggleElement);
    await expect(emojiSelectorState).toEqual("1");
  });

  it("Settings Extensions - Go to Explore panel and assert contents", async () => {
    // Go to Explore Extensions
    await settingsExtensions.clickOnExploreButton();

    // Validate warning message, search extensions header and input are displayed
    const installedAlertText = await settingsExtensions.installedAlertText;
    await expect(installedAlertText).toHaveTextContaining(
      "Extensions are pre-compiled on external hardware. For added security you can compile extensions from source and place in the `extensions` folder.",
    );

    const extensionsSearchHeader =
      await settingsExtensions.extensionsSearchHeader;
    await expect(extensionsSearchHeader).toHaveTextContaining(
      "SEARCH EXTENSIONS",
    );

    await settingsExtensions.extensionsSearchInput.waitForExist();
    const placeholder =
      await settingsExtensions.getPlaceholderFromExtensionsInput();
    await expect(placeholder).toEqual("Extension name or description.");
  });

  it("Settings Extensions - Go to Settings panel and assert contents", async () => {
    // Click on Settings button and go to Settings panel
    await settingsExtensions.clickOnExtensionsSettingsButton();

    // Assert contents from screen
    const openExtensionsHeader =
      await settingsExtensions.openExtensionsHeaderText;
    await expect(openExtensionsHeader).toHaveTextContaining(
      "OPEN EXTENSIONS FOLDER",
    );

    const openExtensionsDescription =
      await settingsExtensions.openExtensionsDescriptionText;
    await expect(openExtensionsDescription).toHaveTextContaining(
      "Open the local directory containing your installed extensions.",
    );

    const enableAutomaticallyHeader =
      await settingsExtensions.enableAutomaticallyHeader;
    await expect(enableAutomaticallyHeader).toHaveTextContaining(
      "ENABLE AUTOMATICALLY",
    );

    const enableAutomaticallyDescription =
      await settingsExtensions.enableAutomaticallyDescription;
    await expect(enableAutomaticallyDescription).toHaveTextContaining(
      "When turned on, new extensions will automatically be enabled by default.",
    );
  });

  it("Settings Extensions - Activate the switch slider for Enable Automatically", async () => {
    // Click on Switch from Enable Automatically to activate it
    await settingsExtensions.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '1' (active)
    const toggleElement =
      await settingsExtensions.enableAutomaticallyControllerValue;
    const enableAutomaticallyState =
      await settingsExtensions.getToggleState(toggleElement);

    await expect(enableAutomaticallyState).toEqual("1");
  });

  it("Settings Extensions - Deactivate the switch slider for Enable Automatically", async () => {
    // Click again on Switch from Enable Automatically to disable it
    await settingsExtensions.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '0' (disabled)
    const toggleElement =
      await settingsExtensions.enableAutomaticallyControllerValue;
    const enableAutomaticallyState =
      await settingsExtensions.getToggleState(toggleElement);

    await expect(enableAutomaticallyState).toEqual("0");
  });

  // Skipped since it needs research on how to close external window from Explorer before proceeding with next tests
  xit("Settings Extensions - Open Extensions Folder", async () => {
    await settingsExtensions.clickOnOpenExtensionsFolder();
  });
}
