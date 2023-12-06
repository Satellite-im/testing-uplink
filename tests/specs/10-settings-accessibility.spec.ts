require("module-alias/register");
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
let settingsAccessibilityFirstUser = new SettingsAccessibilityScreen(
  USER_A_INSTANCE,
);
let settingsNotificationsFirstUser = new SettingsNotificationsScreen(
  USER_A_INSTANCE,
);

export default async function settingsAccessibility() {
  it("Settings Accessibility - Assert screen texts", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsNotificationsFirstUser.goToAccessibilitySettings();
    await settingsAccessibilityFirstUser.waitForIsShown(true);

    // Validate texts for Open Dyslexic Settings Section
    const openDyslexicHeader =
      await settingsAccessibilityFirstUser.openDyslexicHeader;
    const openDyslexicDescription =
      await settingsAccessibilityFirstUser.openDyslexicDescription;
    await expect(openDyslexicHeader).toHaveTextContaining("OPEN DYSLEXIC");
    await expect(openDyslexicDescription).toHaveTextContaining(
      "Open Dyslexic may help some users who suffer from dyslexia, it's a custom font you can enable.",
    );
  });

  it("Settings Accessibility - Click on slider switch to enable Open Dyslexic option", async () => {
    // Click on the Open Dyslexic switch slider from the Settings Accessibility Screen
    await settingsAccessibilityFirstUser.clickOnOpenDyslexic();

    // Validate that toggle has now value = "1" (enabled)
    const toggleElement =
      await settingsAccessibilityFirstUser.openDyslexicControllerValue;
    const openDyslexicStatus =
      await settingsAccessibilityFirstUser.getToggleState(toggleElement);

    await expect(openDyslexicStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the switch slider from Open Dyslexic option in Settings Accessibility Screen
    await settingsAccessibilityFirstUser.clickOnOpenDyslexic();

    // Validate that toggle has now value = "0" (disabled)
    const toggleElement =
      await settingsAccessibilityFirstUser.openDyslexicControllerValue;
    const openDyslexicStatus =
      await settingsAccessibilityFirstUser.getToggleState(toggleElement);

    await expect(openDyslexicStatus).toEqual("0");
  });
}
