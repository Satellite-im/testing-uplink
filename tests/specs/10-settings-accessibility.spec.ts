require("module-alias/register");
import { maximizeWindow } from "@helpers/commands";
import { MACOS_DRIVER } from "@helpers/constants";
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";
import SettingsKeybindsScreen from "@screenobjects/settings/SettingsKeybindsScreen";

export default async function settingsAccessibilityTests() {
  it("Settings Accessibility - Assert screen texts", async () => {
    // If current driver is MacOS, then maximize screen
    const currentDriver = await SettingsKeybindsScreen.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await maximizeWindow();
    }

    // Go to Accessibility Settings Screen
    await SettingsKeybindsScreen.goToAccessibilitySettings();
    await SettingsAccessibilityScreen.waitForIsShown(true);

    // Validate texts for Open Dyslexic Settings Section
    const openDyslexicHeader =
      await SettingsAccessibilityScreen.openDyslexicHeader;
    const openDyslexicDescription =
      await SettingsAccessibilityScreen.openDyslexicDescription;
    await expect(openDyslexicHeader).toHaveTextContaining("OPEN DYSLEXIC");
    await expect(openDyslexicDescription).toHaveTextContaining(
      "Open Dyslexic may help some users who suffer from dyslexia, it's a custom font you can enable.",
    );
  });

  it("Settings Accessibility - Click on slider switch to enable Open Dyslexic option", async () => {
    // Click on the Open Dyslexic switch slider from the Settings Accessibility Screen
    await SettingsAccessibilityScreen.clickOnOpenDyslexic();

    // Validate that toggle has now value = "1" (enabled)
    await SettingsAccessibilityScreen.validateOpenDyslexicIsEnabled();
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the switch slider from Open Dyslexic option in Settings Accessibility Screen
    await SettingsAccessibilityScreen.clickOnOpenDyslexic();

    // Validate that toggle has now value = "0" (disabled)
    await SettingsAccessibilityScreen.validateOpenDyslexicIsDisabled();
  });
}
