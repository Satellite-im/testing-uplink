require("module-alias/register");
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsLicensesScreen from "@screenobjects/settings/SettingsLicenses";

export default async function settingsLicensesTests() {
  it("Settings Licenses - Validate header/description texts and license button are present", async () => {
    // Go to Settings Licenses Screen
    await SettingsAboutScreen.goToLicensesSettings();
    await SettingsLicensesScreen.waitForIsShown(true);

    // Validate the header and description texts from MIT license
    const licenseHeader = await SettingsLicensesScreen.licenseHeader;
    const licenseDescription = await SettingsLicensesScreen.licenseDescription;
    await expect(licenseHeader).toHaveText("UPLINK");
    await expect(licenseDescription).toHaveText(
      "Both code and icons are under the MIT license.",
    );

    // Validate MIT License button is present
    await SettingsLicensesScreen.licenseButton.waitForExist();
  });
}
