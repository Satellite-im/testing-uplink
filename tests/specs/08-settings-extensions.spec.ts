import SettingsAudioScreen from "../screenobjects/settings/SettingsAudioScreen";
import SettingsExtensionsScreen from "../screenobjects/settings/SettingsExtensionsScreen";
import {
  USER_A_INSTANCE,
  MACOS_DRIVER,
  WINDOWS_DRIVER,
} from "../helpers/constants";
let settingsAudioFirstUser = new SettingsAudioScreen(USER_A_INSTANCE);
let settingsExtensionsFirstUser = new SettingsExtensionsScreen(USER_A_INSTANCE);

export default async function settingsExtensions() {
  it("Settings Extensions - Validate that buttons are displayed in front", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsAudioFirstUser.goToExtensionsSettings();
    await settingsExtensionsFirstUser.waitForIsShown(true);

    // Validate that the three buttons are displayed on top of the screen
    await settingsExtensionsFirstUser.installedButton.waitForDisplayed();
    await settingsExtensionsFirstUser.exploreButton.waitForDisplayed();
    await settingsExtensionsFirstUser.extensionsSettingsButton.waitForDisplayed();
  });

  it("Settings Extensions - Validate Emoji Selector extension contents", async () => {
    const currentDriver = await settingsExtensionsFirstUser.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await expect(
        settingsExtensionsFirstUser.emojiSelectorTitle
      ).toHaveTextContaining("Emoji Selector");
      await expect(
        settingsExtensionsFirstUser.emojiSelectorDeveloper
      ).toHaveTextContaining("SATELLITE <DEVS@SATELLITE.IM>");
      await expect(
        settingsExtensionsFirstUser.emojiSelectorDescription
      ).toHaveTextContaining(
        "Browse the standard unicode library of emoji's and send them to friends."
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      console.log(
        "Skipping test on Windows since it needs assets copied before to be implemented"
      );
    }
  });

  it("Settings Extensions - Enable Emoji Selector extension", async () => {
    const currentDriver = await settingsExtensionsFirstUser.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Click on Switch from Emoji Selector to activate it
      await settingsExtensionsFirstUser.clickOnEmojiSelectorCheckbox();

      // Validate that switch from Emoji Selector now has value = '1' (active)
      const toggleElement =
        await settingsExtensionsFirstUser.emojiSelectorCheckboxValue;
      const emojiSelectorState =
        await settingsExtensionsFirstUser.getToggleState(toggleElement);
      await expect(emojiSelectorState).toEqual("1");
    } else if (currentDriver === WINDOWS_DRIVER) {
      console.log(
        "Skipping test on Windows since it needs assets copied before to be implemented"
      );
    }
  });

  it("Settings Extensions - Disable Emoji Selector extension", async () => {
    const currentDriver = await settingsExtensionsFirstUser.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Click again on Switch from Emoji Selector to deactivate it
      await settingsExtensionsFirstUser.clickOnEmojiSelectorCheckbox();

      // Validate that switch from Emoji Selector now has value = '0' (disabled)
      const toggleElement =
        await settingsExtensionsFirstUser.emojiSelectorCheckboxValue;
      const emojiSelectorState =
        await settingsExtensionsFirstUser.getToggleState(toggleElement);
      await expect(emojiSelectorState).toEqual("0");
    } else if (currentDriver === WINDOWS_DRIVER) {
      console.log(
        "Skipping test on Windows since it needs assets copied before to be implemented"
      );
    }
  });

  it("Settings Extensions - Go to Explore panel and assert contents", async () => {
    // Go to Explore Extensions
    await settingsExtensionsFirstUser.clickOnExploreButton();

    // Validate warning message, search extensions header and input are displayed
    await expect(
      settingsExtensionsFirstUser.installedAlertText
    ).toHaveTextContaining(
      "Extensions are pre-compiled on external hardware. For added security you can compile extensions from source and place in the `extensions` folder."
    );
    await expect(
      settingsExtensionsFirstUser.extensionsSearchHeader
    ).toHaveTextContaining("SEARCH EXTENSIONS");
    await settingsExtensionsFirstUser.extensionsSearchInput.waitForDisplayed();
    const placeholder =
      await settingsExtensionsFirstUser.getPlaceholderFromExtensionsInput();
    await expect(placeholder).toEqual("Extension name or description.");
  });

  it("Settings Extensions - Go to Settings panel and assert contents", async () => {
    // Click on Settings button and go to Settings panel
    await settingsExtensionsFirstUser.clickOnExtensionsSettingsButton();

    // Assert contents from screen
    await expect(
      settingsExtensionsFirstUser.openExtensionsHeaderText
    ).toHaveTextContaining("OPEN EXTENSIONS FOLDER");
    await expect(
      settingsExtensionsFirstUser.openExtensionsDescriptionText
    ).toHaveTextContaining(
      "Open the local directory containing your installed extensions."
    );
    await expect(
      settingsExtensionsFirstUser.enableAutomaticallyHeader
    ).toHaveTextContaining("ENABLE AUTOMATICALLY");
    await expect(
      settingsExtensionsFirstUser.enableAutomaticallyDescription
    ).toHaveTextContaining(
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
