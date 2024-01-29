require("module-alias/register");
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";
const settingsAbout = new SettingsAboutScreen();
const settingsAccessibility = new SettingsAccessibilityScreen();

export default async function settingsAboutTests() {
  it("Settings About - Validate header and description texts from settings sections", async () => {
    // Go to Settings About Screen
    await settingsAccessibility.goToAboutSettings();
    await settingsAbout.waitForIsShown(true);

    // Validate the header and description texts from Settings Section - About - About
    const aboutHeader = await settingsAbout.aboutHeader;
    const aboutDescription = await settingsAbout.aboutDescription;
    await expect(aboutHeader).toHaveTextContaining("ABOUT");
    await expect(aboutDescription).toHaveTextContaining("uplink");

    // Validate the header and description texts from Settings Section - About - Version
    const versionHeader = await settingsAbout.versionHeader;
    const versionDescription = await settingsAbout.versionDescription;
    await expect(versionHeader).toHaveTextContaining("VERSION");
    await expect(versionDescription).toHaveText(/^[0-9].[0-9].[0-9]$/);

    // Validate the header and description texts from Settings Section - About - Open Website
    const openWebsiteHeader = await settingsAbout.openWebsiteHeader;
    const openWebsiteDescription = await settingsAbout.openWebsiteDescription;
    await expect(openWebsiteHeader).toHaveTextContaining("OPEN WEBSITE");
    await expect(openWebsiteDescription).toHaveTextContaining(
      "Opens our website in your default web browser.",
    );

    // Validate the header and description texts from Settings Section - About - Open Source Code
    const openSourceHeader = await settingsAbout.openSourceHeader;
    const openSourceDescription = await settingsAbout.openSourceDescription;
    await expect(openSourceHeader).toHaveTextContaining("OPEN SOURCE CODE");
    await expect(openSourceDescription).toHaveTextContaining(
      "Opens the codebase in your default web browser.",
    );

    // Validate the header and description texts from Settings Section - About - MadeIn
    const madeInHeader = await settingsAbout.madeInHeader;
    const madeInDescription = await settingsAbout.madeInDescription;
    const madeInText = await settingsAbout.madeInText;
    await expect(madeInHeader).toHaveTextContaining("MADE IN");
    await expect(madeInDescription).toHaveTextContaining(
      "Our team is all over the world with different backgrounds and day-to-day lives, all working on a common goal to build Uplink & Satellite together.",
    );
  });

  // Test skipped since we need to research on how to return properly to the app before implementing this test
  xit("Settings About - Click on Open Website", async () => {
    await settingsAbout.clickOnOpenWebsite();
  });

  xit("Settings About - Click on Open Source Code", async () => {
    await settingsAbout.clickOnOpenSourceCode();
  });

  it("Settings About - Unlock Developer Settings", async () => {
    // Click 10 times on Version Number to Unlock Developer Settings
    await settingsAbout.unlockDeveloperSettings();

    // Validate Developer Settings button is unlocked
    const developerSettingsButton = await settingsAbout.developerButton;
    await developerSettingsButton.waitForDisplayed();
  });
}
