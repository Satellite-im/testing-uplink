import SettingsDeveloperScreen from "../screenobjects/SettingsDeveloperScreen";
import SettingsAboutScreen from "../screenobjects/SettingsAboutScreen";

export default async function settingsAbout() {
  it("Settings About - Validate header and description texts from settings sections", async () => {
    // Go to Settings Aboout Screen
    await SettingsDeveloperScreen.goToAboutSettings();
    await SettingsAboutScreen.waitForIsShown(true);

    // Validate the header and description texts from Settings Section - About - About
    await expect(await SettingsAboutScreen.aboutHeader).toHaveTextContaining(
      "ABOUT"
    );
    await expect(
      await SettingsAboutScreen.aboutDescription
    ).toHaveTextContaining("uplinkZZZ");

    // Validate the header and description texts from Settings Section - About - Version
    await expect(await SettingsAboutScreen.versionHeader).toHaveTextContaining(
      "VERSION"
    );
    await expect(
      await SettingsAboutScreen.versionDescription
    ).toHaveTextContaining("0.1.0");

    // Validate the header and description texts from Settings Section - About - Open Website
    await expect(
      await SettingsAboutScreen.openWebsiteHeader
    ).toHaveTextContaining("OPEN WEBSITE");
    await expect(
      await SettingsAboutScreen.openWebsiteDescription
    ).toHaveTextContaining("Opens our website in your default web browser.");

    // Validate the header and description texts from Settings Section - About - Open Source Code
    await expect(
      await SettingsAboutScreen.openSourceHeader
    ).toHaveTextContaining("OPEN SOURCE CODE");
    await expect(
      await SettingsAboutScreen.openSourceDescription
    ).toHaveTextContaining("Opens the codebase in your default web browser.");
  });

  // Test skipped since we need to research on how to return properly to the app before implementing this test
  xit("Settings About - Click on Open Website", async () => {
    await SettingsAboutScreen.clickOnOpenWebsite();
  });

  xit("Settings About - Click on Open Source Code", async () => {
    await SettingsAboutScreen.clickOnOpenSourceCode();
  });
}
