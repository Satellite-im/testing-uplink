require("module-alias/register");
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsLicensesScreen from "@screenobjects/settings/SettingsLicenses";
const settingsAbout = new SettingsAboutScreen();
const settingsLicenses = new SettingsLicensesScreen();

export default async function settingsLicensesTests() {
  it("Settings Licenses - Validate header/description texts and license button are present", async () => {
    // Go to Settings Licenses Screen
    await settingsAbout.goToLicensesSettings();
    await settingsLicenses.waitForIsShown(true);

    // Validate the header and description texts from MIT license
    const licenseHeader = await settingsLicenses.licenseHeader;
    const licenseDescription = await settingsLicenses.licenseDescription;
    await expect(licenseHeader).toHaveTextContaining("UPLINK");
    await expect(licenseDescription).toHaveTextContaining(
      "Both code and icons are under the MIT license.",
    );

    // Validate MIT License button is present
    await settingsLicenses.licenseButton.waitForExist();
  });
}
