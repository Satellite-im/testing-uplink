require("module-alias/register");
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";

export default async function settingsAboutTests() {
  it("Settings About - Validate header and description texts from settings sections", async () => {
    // Go to Settings About Screen
    await SettingsAccessibilityScreen.goToAboutSettings();
    await SettingsAboutScreen.waitForIsShown(true);

    // Validate the header and description texts from Settings Section - About - About
    const aboutHeader = await SettingsAboutScreen.aboutHeader;
    const aboutDescription = await SettingsAboutScreen.aboutDescription;
    await expect(aboutHeader).toHaveTextContaining("ABOUT");
    await expect(aboutDescription).toHaveTextContaining("uplink");

    // Validate the header and description texts from Settings Section - About - Version
    const versionHeader = await SettingsAboutScreen.versionHeader;
    const versionDescription = await SettingsAboutScreen.versionDescription;
    await expect(versionHeader).toHaveTextContaining("VERSION");
    await expect(versionDescription).toHaveText(/^[0-9].[0-9].[0-9]$/);

    // Validate the header and description texts from Settings Section - About - Open Website
    const openWebsiteHeader = await SettingsAboutScreen.openWebsiteHeader;
    const openWebsiteDescription =
      await SettingsAboutScreen.openWebsiteDescription;
    await expect(openWebsiteHeader).toHaveTextContaining("OPEN WEBSITE");
    await expect(openWebsiteDescription).toHaveTextContaining(
      "Opens our website in your default web browser.",
    );

    // Validate the header and description texts from Settings Section - About - Open Source Code
    const openSourceHeader = await SettingsAboutScreen.openSourceHeader;
    const openSourceDescription =
      await SettingsAboutScreen.openSourceDescription;
    await expect(openSourceHeader).toHaveTextContaining("OPEN SOURCE CODE");
    await expect(openSourceDescription).toHaveTextContaining(
      "Opens the codebase in your default web browser.",
    );

    // Validate the header and description texts from Settings Section - About - MadeIn
    const madeInHeader = await SettingsAboutScreen.madeInHeader;
    const madeInDescription = await SettingsAboutScreen.madeInDescription;
    const madeInText = await SettingsAboutScreen.madeInText;
    await expect(madeInHeader).toHaveTextContaining("MADE IN");
    await expect(madeInDescription).toHaveTextContaining(
      "Our team is all over the world with different backgrounds and day-to-day lives, all working on a common goal to build Uplink & Satellite together.",
    );
  });

  // Test skipped since we need to research on how to return properly to the app before implementing this test
  xit("Settings About - Click on Open Website", async () => {
    await SettingsAboutScreen.clickOnOpenWebsite();
  });

  xit("Settings About - Click on Open Source Code", async () => {
    await SettingsAboutScreen.clickOnOpenSourceCode();
  });
}
