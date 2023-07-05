import { Given, When, Then } from "@cucumber/cucumber";
import SettingsAccessibilityScreen from "../screenobjects/settings/SettingsAccessibilityScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsAccessibilityFirstUser = new SettingsAccessibilityScreen(
  USER_A_INSTANCE
);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

When(
  /^I go to the Settings Accessibility Screen from Welcome Screen$/,
  async () => {
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);
    await settingsProfileFirstUser.goToAccessibilitySettings();
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
