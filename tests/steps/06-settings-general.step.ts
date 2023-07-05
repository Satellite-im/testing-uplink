import { Given, When, Then } from "@cucumber/cucumber";
import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
let settingsGeneralFirstUser = new SettingsGeneralScreen(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

When(/^I go to the Settings General Screen from Welcome Screen$/, async () => {
  await welcomeScreenFirstUser.goToSettings();
  await settingsProfileFirstUser.waitForIsShown(true);
  await settingsProfileFirstUser.goToGeneralSettings();
  await settingsGeneralFirstUser.waitForIsShown(true);
});

When(/^I am on the Settings General Screen with a new account$/, async () => {
  await settingsGeneralFirstUser.waitForIsShown(true);
});

When(/^I click on Font Dropdown from Settings General$/, async () => {
  await settingsGeneralFirstUser.clickOnFontDropdown();
});

When(/^I click on App Language Dropdown from Settings General$/, async () => {
  await settingsGeneralFirstUser.clickOnAppLanguageDropdown();
});

When(
  /^I click on the increase font size button from Settings General$/,
  async () => {
    await settingsGeneralFirstUser.clickOnFontScalingPlus();
  }
);

When(
  /^I click on the reduce font size button from Settings General$/,
  async () => {
    await settingsGeneralFirstUser.clickOnFontScalingMinus();
  }
);

Then(
  /^I should see the correct header and description displayed for App Language$/,
  async () => {
    await expect(
      settingsGeneralFirstUser.appLanguageHeader
    ).toHaveTextContaining("APP LANGUAGE");
    await expect(settingsGeneralFirstUser.appLanguageDescription).toHaveText(
      "Change Language."
    );
  }
);

Then(
  /^I should see the correct header and description displayed for Theme$/,
  async () => {
    await expect(settingsGeneralFirstUser.themeHeader).toHaveTextContaining(
      "THEME"
    );
    await expect(
      settingsGeneralFirstUser.themeDescription
    ).toHaveTextContaining("Change the theme of the app.");
  }
);

Then(
  /^I should see the correct header and description displayed for Font$/,
  async () => {
    await expect(settingsGeneralFirstUser.fontHeader).toHaveTextContaining(
      "FONT"
    );
    await expect(settingsGeneralFirstUser.fontDescription).toHaveTextContaining(
      "Change the font of the app."
    );
  }
);

Then(
  /^I should see the correct header and description displayed for Font Scaling$/,
  async () => {
    await expect(
      settingsGeneralFirstUser.fontScalingHeader
    ).toHaveTextContaining("FONT SCALING");
    await expect(
      settingsGeneralFirstUser.fontScalingDescription
    ).toHaveTextContaining("Scale the font size up or down to your liking.");
  }
);

Then(/^I should be able to select the font (.*)$/, async (font: string) => {
  await settingsGeneralFirstUser.selectFont(font);
});

Then(
  /^I should be able to select the language (.*)$/,
  async (language: string) => {
    await settingsGeneralFirstUser.selectAppLanguage(language);
  }
);

Then(
  /^I should see Font Size value selected is (.*)$/,
  async (fontSize: string) => {
    await expect(
      settingsGeneralFirstUser.fontScalingValue
    ).toHaveTextContaining(fontSize);
  }
);
