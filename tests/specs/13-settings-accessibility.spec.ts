import SettingsExtensionsScreen from "../screenobjects/SettingsExtensionsScreen";
import SettingsAccessibilityScreen from "../screenobjects/SettingsAccessibilityScreen";

export default async function settingsAccessibility() {
  it("Settings Accessibility - Assert screen texts", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsExtensionsScreen.goToAccessibilitySettings();
    await SettingsAccessibilityScreen.waitForIsShown(true);

    // Validate texts for Open Dyslexic Settings Section
    await expect(
      await SettingsAccessibilityScreen.openDyslexicHeader
    ).toHaveTextContaining("OPEN DYSLEXIC");
    await expect(
      await SettingsAccessibilityScreen.openDyslexicDescription
    ).toHaveTextContaining(
      "Open Dyslexic may help some users who suffer from dyslexia, it's a custom font you can enable."
    );
  });

  it("Settings Accessibility - Click on slider switch to enable Open Dyslexic option", async () => {
    // Click on the Open Dyslexic switch slider from the Settings Accessibility Screen
    await SettingsAccessibilityScreen.clickOnOpenDyslexic();

    // Validate that toggle has now value = "1" (enabled)
    const openDyslexicStatus = await SettingsAccessibilityScreen.getToggleState(
      await SettingsAccessibilityScreen.openDyslexicControllerValue
    );

    await expect(openDyslexicStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the switch slider from Open Dyslexic option in Settings Accessibility Screen
    await SettingsAccessibilityScreen.clickOnOpenDyslexic();

    // Validate that toggle has now value = "0" (disabled)
    const openDyslexicStatus = await SettingsAccessibilityScreen.getToggleState(
      await SettingsAccessibilityScreen.openDyslexicControllerValue
    );

    await expect(openDyslexicStatus).toEqual("0");
  });
}
