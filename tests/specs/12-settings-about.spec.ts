import SettingsAboutScreen from "../screenobjects/settings/SettingsAboutScreen";
import SettingsDeveloperScreen from "../screenobjects/settings/SettingsDeveloperScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsAboutFirstUser = new SettingsAboutScreen(USER_A_INSTANCE);
let settingsDeveloperFirstUser = new SettingsDeveloperScreen(USER_A_INSTANCE);

export default async function settingsAbout() {
  it("Settings About - Validate header and description texts from settings sections", async () => {
    // Go to Settings About Screen
    await settingsDeveloperFirstUser.goToAboutSettings();
    await settingsAboutFirstUser.waitForIsShown(true);

    // Validate the header and description texts from Settings Section - About - About
    await expect(settingsAboutFirstUser.aboutHeader).toHaveTextContaining(
      "ABOUT"
    );
    await expect(settingsAboutFirstUser.aboutDescription).toHaveTextContaining(
      "uplink"
    );

    // Validate the header and description texts from Settings Section - About - Version
    await expect(settingsAboutFirstUser.versionHeader).toHaveTextContaining(
      "VERSION"
    );
    await expect(settingsAboutFirstUser.versionDescription).toHaveText(
      /^[0-9].[0-9].[0-9]$/
    );

    // Validate the header and description texts from Settings Section - About - Open Website
    await expect(settingsAboutFirstUser.openWebsiteHeader).toHaveTextContaining(
      "OPEN WEBSITE"
    );
    await expect(
      settingsAboutFirstUser.openWebsiteDescription
    ).toHaveTextContaining("Opens our website in your default web browser.");

    // Validate the header and description texts from Settings Section - About - Open Source Code
    await expect(settingsAboutFirstUser.openSourceHeader).toHaveTextContaining(
      "OPEN SOURCE CODE"
    );
    await expect(
      settingsAboutFirstUser.openSourceDescription
    ).toHaveTextContaining("Opens the codebase in your default web browser.");
  });

  // Test skipped since we need to research on how to return properly to the app before implementing this test
  xit("Settings About - Click on Open Website", async () => {
    await settingsAboutFirstUser.clickOnOpenWebsite();
  });

  xit("Settings About - Click on Open Source Code", async () => {
    await settingsAboutFirstUser.clickOnOpenSourceCode();
  });
}
