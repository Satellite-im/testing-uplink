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
    await expect(aboutHeader).toHaveText("ABOUT");
    await expect(aboutDescription).toHaveText("uplink");

    // Validate the header and description texts from Settings Section - About - Version
    const versionHeader = await SettingsAboutScreen.versionHeader;
    const versionDescription = await SettingsAboutScreen.versionDescription;
    await expect(versionHeader).toHaveText("VERSION");
    await expect(versionDescription).toContain(/^[0-9].[0-9].[0-9]$/);

    // Validate the header and description texts from Settings Section - About - Open Website
    const openWebsiteHeader = await SettingsAboutScreen.openWebsiteHeader;
    const openWebsiteDescription =
      await SettingsAboutScreen.openWebsiteDescription;
    await expect(openWebsiteHeader).toHaveText("OPEN WEBSITE");
    await expect(openWebsiteDescription).toHaveText(
      "Opens our website in your default web browser.",
    );

    // Validate the header and description texts from Settings Section - About - Open Source Code
    const openSourceHeader = await SettingsAboutScreen.openSourceHeader;
    const openSourceDescription =
      await SettingsAboutScreen.openSourceDescription;
    await expect(openSourceHeader).toHaveText("OPEN SOURCE CODE");
    await expect(openSourceDescription).toHaveText(
      "Opens the codebase in your default web browser.",
    );

    // Validate the header and description texts from Settings Section - About - MadeIn
    const madeInHeader = await SettingsAboutScreen.madeInHeader;
    const madeInDescription = await SettingsAboutScreen.madeInDescription;
    const madeInText = await SettingsAboutScreen.madeInText;
    await expect(madeInHeader).toHaveText("MADE IN");
    await expect(madeInDescription).toHaveText(
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
