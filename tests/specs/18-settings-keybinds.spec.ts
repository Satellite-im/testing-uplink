require("module-alias/register");
import { sendCustomKeybinds } from "@helpers/commands";
import { MACOS_DRIVER } from "@helpers/constants";
import DebugLogger from "@screenobjects/developer/DebugLogger";
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsExtensionsScreen from "@screenobjects/settings/SettingsExtensionsScreen";
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsKeybindsScreen from "@screenobjects/settings/SettingsKeybindsScreen";
import WebInspector from "@screenobjects/developer/WebInspector";
const debugLogger = new DebugLogger();
const settingsAbout = new SettingsAboutScreen();
const settingsExtensions = new SettingsExtensionsScreen();
const settingsGeneral = new SettingsGeneralScreen();
const settingsKeybinds = new SettingsKeybindsScreen();
const webInspector = new WebInspector();

export default async function settingsKeybindsTests() {
  it("Settings Keyboard Shortcuts - Validate header and description texts are correct", async () => {
    // Go to Settings Keybinds Screen and validate the texts displayed on screen
    await settingsExtensions.goToKeyboardShortcutsSettings();
    await settingsKeybinds.waitForIsShown(true);

    // Validate main info header text for Keybinds Settings Section
    const screenLabelText =
      await settingsKeybinds.settingsKeybindsInfoTextValue;
    await expect(screenLabelText).toHaveText(
      "Global keybinds are disabled while on this page. Click to edit a keybind, press the keybind to highlight and find a specific shortcut.",
    );

    // Validate revert keybinds header and description texts
    const resetKeybindsHeader = await settingsKeybinds.resetKeybindsHeader;
    const resetKeybindsDescription =
      await settingsKeybinds.resetKeybindsDescription;
    await expect(resetKeybindsHeader).toHaveText("REVERT KEYBINDS");
    await expect(resetKeybindsDescription).toHaveText(
      "Revert keybinds to the default mappings.",
    );

    // Validate description text for Increase Font Size Keybind
    const increaseFontSizeDescription =
      await settingsKeybinds.increaseFontSizeLabelText;
    await expect(increaseFontSizeDescription).toHaveText(
      "Increase font size within Uplink.",
    );

    // Validate description text for Decrease Font Size Keybind
    const decreaseFontSizeDescription =
      await settingsKeybinds.decreaseFontSizeLabelText;
    await expect(decreaseFontSizeDescription).toHaveText(
      "Decrease font size within Uplink.",
    );

    // Validate description text for Toggle Menu Keybind
    const toggleMuteDescription = await settingsKeybinds.toggleMuteLabelText;
    await expect(toggleMuteDescription).toHaveText(
      "Mute & un-mute your microphone.",
    );

    // Validate description text for Toggle Deafen Keybind
    const toggleDeafenDescription =
      await settingsKeybinds.toggleDeafenLabelText;
    await expect(toggleDeafenDescription).toHaveText(
      "Toggle turning off all sounds including your microphone and headphones.",
    );

    // Validate description text for Open Developer Tools Keybind
    const openCloseDevToolsDescription =
      await settingsKeybinds.openCloseDevToolsLabelText;
    await expect(openCloseDevToolsDescription).toHaveText(
      "Open/Close Web Inspector",
    );

    // Validate description text for Toggle Developer Mode Keybind
    const toggleDevModeDescription =
      await settingsKeybinds.toggleDevModeLabelText;
    await expect(toggleDevModeDescription).toHaveText("Toggle Developer Mode");

    // Validate description text for Hide/Focus Uplink Keybind
    const hideFocusUplinkDescription =
      await settingsKeybinds.hideFocusUplinkLabelText;
    await expect(hideFocusUplinkDescription).toHaveText("Hide/Focus Uplink");
  });

  it("Settings Keyboard Shortcuts - Validate default keybinds are displayed", async () => {
    // Get current driver for validation
    const currentDriver = await settingsKeybinds.getCurrentDriver();

    // Validate default keybind for Increase Font Size is correct
    const increaseFontSizeKeybind =
      await settingsKeybinds.getKeybinds("increase-font-size");
    await expect(increaseFontSizeKeybind).toEqual(["CONTROL", "SHIFT", "="]);

    // Validate default keybind for Decrease Font Size is correct
    const decreaseFontSizeKeybind =
      await settingsKeybinds.getKeybinds("decrease-font-size");
    await expect(decreaseFontSizeKeybind).toEqual(["CONTROL", "SHIFT", "-"]);

    // Validate default keybind for Toggle Mute is correct depending on the OS
    const toggleMuteKeybind = await settingsKeybinds.getKeybinds("toggle-mute");
    if (currentDriver === MACOS_DRIVER) {
      await expect(toggleMuteKeybind).toEqual(["COMMAND", "SHIFT", "M"]);
    } else {
      await expect(toggleMuteKeybind).toEqual(["ALT", "SHIFT", "M"]);
    }

    // Validate default keybind for Toggle Deafen is correct depending on the OS
    const toggleDeafenKeybind =
      await settingsKeybinds.getKeybinds("toggle-deafen");
    if (currentDriver === MACOS_DRIVER) {
      await expect(toggleDeafenKeybind).toEqual(["COMMAND", "SHIFT", "D"]);
    } else {
      await expect(toggleDeafenKeybind).toEqual(["ALT", "SHIFT", "D"]);
    }

    // Validate default keybind for Open Close Web Inspector is correct
    const openCloseDevToolsKeybind = await settingsKeybinds.getKeybinds(
      "open-close-dev-tools",
    );
    await expect(openCloseDevToolsKeybind).toEqual(["CONTROL", "SHIFT", "I"]);

    // Validate default keybind for Toggle DevMode is correct
    const toggleDevModeKeybind =
      await settingsKeybinds.getKeybinds("toggle-devmode");
    await expect(toggleDevModeKeybind).toEqual(["CONTROL", "SHIFT", "D"]);

    // Validate default keybind for Hide/Focus Uplink is correct
    const hideFocusUplinkKeybind =
      await settingsKeybinds.getKeybinds("hide-focus-uplink");
    await expect(hideFocusUplinkKeybind).toEqual(["CONTROL", "SHIFT", "U"]);
  });

  it("Settings Keyboards Shortcuts - Change Increase Font Size Keybind", async () => {
    // Type Ctrl + Shift + =
    await sendCustomKeybinds(4, 7, 73);
    await settingsKeybinds.editKeybind("increase-font-size");
    // Type Ctrl + A
    await sendCustomKeybinds(4, 45);

    const increaseFontSizeKeybind =
      await settingsKeybinds.getKeybinds("increase-font-size");
    await expect(increaseFontSizeKeybind).toEqual(["CONTROL", "A"]);
  });

  it("Keybind Shortcuts - Validate custom keybind can be used correctly", async () => {
    // Go to General Settings to validate Increase Font Size Keybind
    await settingsKeybinds.goToGeneralSettings();
    await settingsGeneral.waitForIsShown(true);

    // Press Ctrl + A to increase font size from 0.75 to 1.0
    await sendCustomKeybinds(4, 45);
    const valueAfterIncreasing = await settingsGeneral.fontScalingValue;
    await expect(valueAfterIncreasing).toHaveText("1");
  });

  it("Settings Keyboards Shortcuts - Reset Increase Font Size Keybind", async () => {
    // Return to Settings Keybinds Screen
    await settingsGeneral.goToKeyboardShortcutsSettings();
    await settingsKeybinds.waitForIsShown(true);

    // Reset Keyboard Shortcut for Increase Font Size
    await settingsKeybinds.clickOnRevertIncreaseFontSize();
    const increaseFontSizeKeybind =
      await settingsKeybinds.getKeybinds("increase-font-size");
    await expect(increaseFontSizeKeybind).toEqual(["CONTROL", "SHIFT", "="]);
  });

  it("Settings Keyboards Shortcuts - User can update more than one keybind", async () => {
    // Change at least two different keybinds. First, change Decrease Font Size Keybind, by typing Ctrl + Shift + -
    await sendCustomKeybinds(4, 7, 72);
    // Edit Decrease Font Size Keybind to Ctrl + B
    await settingsKeybinds.editKeybind("decrease-font-size");
    await sendCustomKeybinds(4, 46);

    // Validate change was applied correctly to Decrease Font Size Keybind
    const decreaseFontSizeKeybind =
      await settingsKeybinds.getKeybinds("decrease-font-size");
    await expect(decreaseFontSizeKeybind).toEqual(["CONTROL", "B"]);

    // Now, change Hide/Focus Uplink Keybind by typing Ctrl + Shift + U
    await sendCustomKeybinds(4, 7, 65);
    await settingsKeybinds.editKeybind("hide-focus-uplink");
    // Type Alt + Ctrl + Shift + P
    await sendCustomKeybinds(3, 4, 7, 60);

    // Validate change was applied correctly to Hide/Focus Uplink Keybind
    const hideFocusUplinkKeybind =
      await settingsKeybinds.getKeybinds("hide-focus-uplink");
    await expect(hideFocusUplinkKeybind).toEqual([
      "ALT",
      "CONTROL",
      "SHIFT",
      "P",
    ]);
  });

  it("Settings Keyboards Shortcuts - User can revert all Keybinds to Default Values", async () => {
    // Click on Revert all keybinds
    await settingsKeybinds.clickOnRevertAllKeybinds();

    // Validate default keys are assigned for Decrease Font Size Keybind (Ctrl + Shift + -)
    const decreaseFontSizeKeybindDefault =
      await settingsKeybinds.getKeybinds("decrease-font-size");
    await expect(decreaseFontSizeKeybindDefault).toEqual([
      "CONTROL",
      "SHIFT",
      "-",
    ]);

    // Validate default keys are assigned for Hide/Show Uplink Keybind (Ctrl + Shift + U)
    const hideFocusUplinkKeybindDefault =
      await settingsKeybinds.getKeybinds("hide-focus-uplink");
    await expect(hideFocusUplinkKeybindDefault).toEqual([
      "CONTROL",
      "SHIFT",
      "U",
    ]);
  });

  it("Settings Keybinds - Unlock Developer Settings on Settings About", async () => {
    // Click 10 times on Version Number to Unlock Developer Settings
    await settingsKeybinds.goToAboutSettings();
    await settingsAbout.unlockDeveloperSettings();

    // Validate Developer Settings button is unlocked
    const developerSettingsButton = await settingsAbout.developerButton;
    await developerSettingsButton.waitForDisplayed();
  });

  it("Keybind Shortcuts - Validate default keybinds for Increase/Decrease Font Size are working", async () => {
    // Go to General Settings to validate Increase Font Size Keybind
    await settingsAbout.goToGeneralSettings();
    await settingsGeneral.waitForIsShown(true);

    // Press Ctrl + Shift + = to increase font size from 1.0 to 1.25
    await sendCustomKeybinds(4, 7, 73);
    const valueAfterIncreasing = await settingsGeneral.fontScalingValue;
    await expect(valueAfterIncreasing).toHaveText("1.25");

    // Press Ctrl + Shift + Minus to decrease font size from 1.25 to 1.0
    await sendCustomKeybinds(4, 7, 72);
    const valueAfterDecreasing = await settingsGeneral.fontScalingValue;
    await expect(valueAfterDecreasing).toHaveText("1");
  });

  it("Keybind Shortcuts - Validate default keybind for Open/Close Web Inspector is working", async () => {
    const currentDriver = await settingsGeneral.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Press Ctrl + Shift + I to Open Web Inspector
      await sendCustomKeybinds(4, 7, 53);

      // Validate Web Inspector is displayed
      await webInspector.validateWebInspectorIsShown();

      // Press Ctrl + Shift + I to Close Web Inspector
      await sendCustomKeybinds(4, 7, 53);

      // Validate Web Inspector is not displayed
      await webInspector.validateWebInspectorIsNotShown();
    }
  });

  it("Keybind Shortcuts - Validate default keybind for Developer Mode is working", async () => {
    // Press Ctrl + Shift + I to Open Developer Mode
    await sendCustomKeybinds(4, 7, 48);

    // Validate Debug Logger is Displayed
    await debugLogger.validateDebugLoggerIsDisplayed();

    // Press Ctrl + Shift + I to Close Developer Mode
    await sendCustomKeybinds(4, 7, 48);

    // Validate Debug Logger is Not Shown
    await debugLogger.validateDebugLoggerIsNotDisplayed();
  });

  it("Keybind Shortcuts - Validate default keybind for Hide/Focus Uplink is working", async () => {
    // Press Ctrl + Shift + U to Hide Uplink
    await sendCustomKeybinds(4, 7, 65);

    // Validate Uplink is not displayed
    await settingsGeneral.validateSettingsGeneralIsNotShown;

    // Press Ctrl + Shift + U to Focus Uplink
    await sendCustomKeybinds(4, 7, 65);

    // Validate Uplink is displayed
    await settingsGeneral.waitForIsShown(true);

    // Go back to Keybinds Settings
    await settingsGeneral.goToKeyboardShortcutsSettings();
    await settingsKeybinds.waitForIsShown(true);
  });
}
