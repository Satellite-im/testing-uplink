import { Given, When, Then } from "@wdio/cucumber-framework";
import SettingsAboutScreen from "../screenobjects/settings/SettingsAboutScreen";
import SettingsDeveloperScreen from "../screenobjects/settings/SettingsDeveloperScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsAboutFirstUser = new SettingsAboutScreen(USER_A_INSTANCE);
let settingsDeveloperFirstUser = new SettingsDeveloperScreen(USER_A_INSTANCE);

Given(
  /^I go to the Settings About Screen from Settings Developer Screen$/,
  async () => {
    await settingsDeveloperFirstUser.goToAboutSettings();
    await settingsAboutFirstUser.waitForIsShown(true);
  }
);

When(/^I am on the Settings About Screen with a new account$/, async () => {
  await settingsAboutFirstUser.waitForIsShown(true);
});

When(
  /^I click on Open Website button from Settings About Screen$/,
  async () => {
    await settingsAboutFirstUser.clickOnOpenWebsite();
  }
);

When(
  /^I click on Open Source Code button from Settings About Screen$/,
  async () => {
    await settingsAboutFirstUser.clickOnOpenSourceCode();
  }
);

Then(
  /^I should see the About header and description are correct$/,
  async () => {
    await expect(settingsAboutFirstUser.aboutHeader).toHaveTextContaining(
      "ABOUT"
    );
    await expect(settingsAboutFirstUser.aboutDescription).toHaveTextContaining(
      "uplink"
    );
  }
);

Then(
  /^I should see the Version header and description are correct$/,
  async () => {
    await expect(settingsAboutFirstUser.versionHeader).toHaveTextContaining(
      "VERSION"
    );
    await expect(settingsAboutFirstUser.versionDescription).toHaveText(
      /^[0-9].[0-9].[0-9]$/
    );
  }
);

Then(
  /^I should see the Open Website header and description are correct$/,
  async () => {
    await expect(settingsAboutFirstUser.openWebsiteHeader).toHaveTextContaining(
      "OPEN WEBSITE"
    );
    await expect(
      settingsAboutFirstUser.openWebsiteDescription
    ).toHaveTextContaining("Opens our website in your default web browser.");
  }
);

Then(
  /^I should see the Open Source Code header and description are correct$/,
  async () => {
    await expect(settingsAboutFirstUser.openSourceHeader).toHaveTextContaining(
      "OPEN SOURCE CODE"
    );
    await expect(
      settingsAboutFirstUser.openSourceDescription
    ).toHaveTextContaining("Opens the codebase in your default web browser.");
  }
);

Then(
  /^I should see a browser with the Uplink website opened in a new tab$/,
  async () => {
    console.log("Not implemented yet");
  }
);

Then(
  /^I should see a browser with the app source code website opened in a new tab$/,
  async () => {
    console.log("Not implemented yet");
  }
);
