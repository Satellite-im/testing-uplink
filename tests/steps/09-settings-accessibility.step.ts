import { Given, When, Then } from "@wdio/cucumber-framework";
import SettingsAccessibilityScreen from "../screenobjects/settings/SettingsAccessibilityScreen";
import SettingsExtensionsScreen from "../screenobjects/settings/SettingsExtensionsScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsAccessibilityFirstUser = new SettingsAccessibilityScreen(
  USER_A_INSTANCE
);
let settingsExtensionsFirstUser = new SettingsExtensionsScreen(USER_A_INSTANCE);

Given(
  /^I go to the Settings Accessibility Screen from Settings Extensions Screen$/,
  async () => {
    await settingsExtensionsFirstUser.goToAccessibilitySettings();
    await settingsAccessibilityFirstUser.waitForIsShown(true);
  }
);

When(
  /^I am on the Settings Accessibility Screen with a new account$/,
  async () => {
    await settingsAccessibilityFirstUser.waitForIsShown(true);
  }
);

When(
  /^I should see the Open Dyslexic header and description are correct$/,
  async () => {
    await expect(
      settingsAccessibilityFirstUser.openDyslexicHeader
    ).toHaveTextContaining("OPEN DYSLEXIC");
    await expect(
      settingsAccessibilityFirstUser.openDyslexicDescription
    ).toHaveTextContaining(
      "Open Dyslexic may help some users who suffer from dyslexia, it's a custom font you can enable."
    );
  }
);

When(
  /^I click on the Open Dyslexic switch slider from Settings Accessibility Screen$/,
  async () => {
    await settingsAccessibilityFirstUser.clickOnOpenDyslexic();
  }
);

Then(
  /^I should see the current value for Open Dyslexic switch is (.*)$/,
  async (value: string) => {
    const toggleElement =
      await settingsAccessibilityFirstUser.openDyslexicControllerValue;
    const openDyslexicStatus =
      await settingsAccessibilityFirstUser.getToggleState(toggleElement);
    if (value === "enabled") {
      await expect(openDyslexicStatus).toEqual("1");
    } else if (value === "disabled") {
      await expect(openDyslexicStatus).toEqual("0");
    }
  }
);
