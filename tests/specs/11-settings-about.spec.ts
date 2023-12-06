require("module-alias/register");
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
let settingsAboutFirstUser = new SettingsAboutScreen(USER_A_INSTANCE);
let settingsAccessibilityFirstUser = new SettingsAccessibilityScreen(
  USER_A_INSTANCE,
);

export default async function settingsAbout() {
  it("Settings About - Validate header and description texts from settings sections", async () => {
    // Go to Settings About Screen
    await settingsAccessibilityFirstUser.goToAboutSettings();
    await settingsAboutFirstUser.waitForIsShown(true);

    // Validate the header and description texts from Settings Section - About - About
    const aboutHeader = await settingsAboutFirstUser.aboutHeader;
    const aboutDescription = await settingsAboutFirstUser.aboutDescription;
    await expect(aboutHeader).toHaveTextContaining("ABOUT");
    await expect(aboutDescription).toHaveTextContaining("uplink");

    // Validate the header and description texts from Settings Section - About - Version
    const versionHeader = await settingsAboutFirstUser.versionHeader;
    const versionDescription = await settingsAboutFirstUser.versionDescription;
    await expect(versionHeader).toHaveTextContaining("VERSION");
    await expect(versionDescription).toHaveText(/^[0-9].[0-9].[0-9]$/);

    // Validate the header and description texts from Settings Section - About - Open Website
    const openWebsiteHeader = await settingsAboutFirstUser.openWebsiteHeader;
    const openWebsiteDescription =
      await settingsAboutFirstUser.openWebsiteDescription;
    await expect(openWebsiteHeader).toHaveTextContaining("OPEN WEBSITE");
    await expect(openWebsiteDescription).toHaveTextContaining(
      "Opens our website in your default web browser.",
    );

    // Validate the header and description texts from Settings Section - About - Open Source Code
    const openSourceHeader = await settingsAboutFirstUser.openSourceHeader;
    const openSourceDescription =
      await settingsAboutFirstUser.openSourceDescription;
    await expect(openSourceHeader).toHaveTextContaining("OPEN SOURCE CODE");
    await expect(openSourceDescription).toHaveTextContaining(
      "Opens the codebase in your default web browser.",
    );
  });

  // Test skipped since we need to research on how to return properly to the app before implementing this test
  xit("Settings About - Click on Open Website", async () => {
    await settingsAboutFirstUser.clickOnOpenWebsite();
  });

  xit("Settings About - Click on Open Source Code", async () => {
    await settingsAboutFirstUser.clickOnOpenSourceCode();
  });

  it("Settings About - Unlock Developer Settings", async () => {
    // Click 10 times on Version Number to Unlock Developer Settings
    await settingsAboutFirstUser.unlockDeveloperSettings();

    // Validate Developer Settings button is unlocked
    const developerSettingsButton =
      await settingsAboutFirstUser.developerButton;
    await developerSettingsButton.waitForDisplayed();
  });
}
