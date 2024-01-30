require("module-alias/register");
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
const settingsAccessibility = new SettingsAccessibilityScreen();
const settingsBase = new SettingsBaseScreen();

export default async function settingsAccessibilityTests() {
  it("Settings Accessibility - Assert screen texts", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsBase.goToAccessibilitySettings();
    await settingsAccessibility.waitForIsShown(true);

    // Validate texts for Open Dyslexic Settings Section
    const openDyslexicHeader = await settingsAccessibility.openDyslexicHeader;
    const openDyslexicDescription =
      await settingsAccessibility.openDyslexicDescription;
    await expect(openDyslexicHeader).toHaveTextContaining("OPEN DYSLEXIC");
    await expect(openDyslexicDescription).toHaveTextContaining(
      "Open Dyslexic may help some users who suffer from dyslexia, it's a custom font you can enable.",
    );
  });

  it("Settings Accessibility - Click on slider switch to enable Open Dyslexic option", async () => {
    // Click on the Open Dyslexic switch slider from the Settings Accessibility Screen
    await settingsAccessibility.clickOnOpenDyslexic();

    // Validate that toggle has now value = "1" (enabled)
    const toggleElement =
      await settingsAccessibility.openDyslexicControllerValue;
    const openDyslexicStatus =
      await settingsAccessibility.getToggleState(toggleElement);

    await expect(openDyslexicStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the switch slider from Open Dyslexic option in Settings Accessibility Screen
    await settingsAccessibility.clickOnOpenDyslexic();

    // Validate that toggle has now value = "0" (disabled)
    const toggleElement =
      await settingsAccessibility.openDyslexicControllerValue;
    const openDyslexicStatus =
      await settingsAccessibility.getToggleState(toggleElement);

    await expect(openDyslexicStatus).toEqual("0");
  });
}
