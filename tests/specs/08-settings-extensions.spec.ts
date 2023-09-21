import "module-alias/register";
import SettingsAudioScreen from "@screenobjects/settings/SettingsAudioScreen";
import SettingsExtensionsScreen from "@screenobjects/settings/SettingsExtensionsScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
let settingsAudioFirstUser = new SettingsAudioScreen(USER_A_INSTANCE);
let settingsExtensionsFirstUser = new SettingsExtensionsScreen(USER_A_INSTANCE);

export default async function settingsExtensions() {
  it("Settings Extensions - Validate that buttons are displayed in front", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsAudioFirstUser.goToExtensionsSettings();
    await settingsExtensionsFirstUser.waitForIsShown(true);

    // Validate that the three buttons are displayed on top of the screen
    const installedButton = await settingsExtensionsFirstUser.installedButton;
    const exploreButton = await settingsExtensionsFirstUser.exploreButton;
    const extensionsSettingsButton =
      await settingsExtensionsFirstUser.extensionsSettingsButton;

    await installedButton.waitForExist();
    await exploreButton.waitForExist();
    await extensionsSettingsButton.waitForExist();
  });

  it("Settings Extensions - Validate Emoji Selector extension contents", async () => {
    const emojiSelectorTitle =
      await settingsExtensionsFirstUser.emojiSelectorTitle;
    const emojiSelectorDeveloper =
      await settingsExtensionsFirstUser.emojiSelectorDeveloper;
    const emojiSelectorDescription =
      await settingsExtensionsFirstUser.emojiSelectorDescription;

    await expect(emojiSelectorTitle).toHaveTextContaining("Emoji Selector");
    await expect(emojiSelectorDeveloper).toHaveTextContaining(
      "SATELLITE <DEVS@SATELLITE.IM>"
    );
    await expect(emojiSelectorDescription).toHaveTextContaining(
      "Browse the standard unicode library of emoji's and send them to friends."
    );
  });

  it("Settings Extensions - Disable Emoji Selector extension", async () => {
    // Click again on Switch from Emoji Selector to deactivate it
    await settingsExtensionsFirstUser.clickOnEmojiSelectorCheckbox();

    // Validate that switch from Emoji Selector now has value = '0' (disabled)
    const toggleElement =
      await settingsExtensionsFirstUser.emojiSelectorCheckboxValue;
    const emojiSelectorState = await settingsExtensionsFirstUser.getToggleState(
      toggleElement
    );
    await expect(emojiSelectorState).toEqual("0");
  });

  it("Settings Extensions - Enable Emoji Selector extension", async () => {
    // Click on Switch from Emoji Selector to activate it
    await settingsExtensionsFirstUser.clickOnEmojiSelectorCheckbox();

    // Validate that switch from Emoji Selector now has value = '1' (active)
    const toggleElement =
      await settingsExtensionsFirstUser.emojiSelectorCheckboxValue;
    const emojiSelectorState = await settingsExtensionsFirstUser.getToggleState(
      toggleElement
    );
    await expect(emojiSelectorState).toEqual("1");
  });

  it("Settings Extensions - Go to Explore panel and assert contents", async () => {
    // Go to Explore Extensions
    await settingsExtensionsFirstUser.clickOnExploreButton();

    // Validate warning message, search extensions header and input are displayed
    const installedAlertText =
      await settingsExtensionsFirstUser.installedAlertText;
    await expect(installedAlertText).toHaveTextContaining(
      "Extensions are pre-compiled on external hardware. For added security you can compile extensions from source and place in the `extensions` folder."
    );

    const extensionsSearchHeader =
      await settingsExtensionsFirstUser.extensionsSearchHeader;
    await expect(extensionsSearchHeader).toHaveTextContaining(
      "SEARCH EXTENSIONS"
    );

    const extensionsSearchInput =
      await settingsExtensionsFirstUser.extensionsSearchInput;
    await extensionsSearchInput.waitForExist();
    const placeholder =
      await settingsExtensionsFirstUser.getPlaceholderFromExtensionsInput();
    await expect(placeholder).toEqual("Extension name or description.");
  });

  it("Settings Extensions - Go to Settings panel and assert contents", async () => {
    // Click on Settings button and go to Settings panel
    await settingsExtensionsFirstUser.clickOnExtensionsSettingsButton();

    // Assert contents from screen
    const openExtensionsHeader =
      await settingsExtensionsFirstUser.openExtensionsHeaderText;
    await expect(openExtensionsHeader).toHaveTextContaining(
      "OPEN EXTENSIONS FOLDER"
    );

    const openExtensionsDescription =
      await settingsExtensionsFirstUser.openExtensionsDescriptionText;
    await expect(openExtensionsDescription).toHaveTextContaining(
      "Open the local directory containing your installed extensions."
    );

    const enableAutomaticallyHeader =
      await settingsExtensionsFirstUser.enableAutomaticallyHeader;
    await expect(enableAutomaticallyHeader).toHaveTextContaining(
      "ENABLE AUTOMATICALLY"
    );

    const enableAutomaticallyDescription =
      await settingsExtensionsFirstUser.enableAutomaticallyDescription;
    await expect(enableAutomaticallyDescription).toHaveTextContaining(
      "When turned on, new extensions will automatically be enabled by default."
    );
  });

  it("Settings Extensions - Activate the switch slider for Enable Automatically", async () => {
    // Click on Switch from Enable Automatically to activate it
    await settingsExtensionsFirstUser.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '1' (active)
    const toggleElement =
      await settingsExtensionsFirstUser.enableAutomaticallyControllerValue;
    const enableAutomaticallyState =
      await settingsExtensionsFirstUser.getToggleState(toggleElement);

    await expect(enableAutomaticallyState).toEqual("1");
  });

  it("Settings Extensions - Deactivate the switch slider for Enable Automatically", async () => {
    // Click again on Switch from Enable Automatically to disable it
    await settingsExtensionsFirstUser.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '0' (disabled)
    const toggleElement =
      await settingsExtensionsFirstUser.enableAutomaticallyControllerValue;
    const enableAutomaticallyState =
      await settingsExtensionsFirstUser.getToggleState(toggleElement);

    await expect(enableAutomaticallyState).toEqual("0");
  });

  // Skipped since it needs research on how to close external window from Explorer before proceeding with next tests
  xit("Settings Extensions - Open Extensions Folder", async () => {
    await settingsExtensionsFirstUser.clickOnOpenExtensionsFolder();
  });
}
