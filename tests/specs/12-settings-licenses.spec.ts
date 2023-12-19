require("module-alias/register");
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsLicensesScreen from "@screenobjects/settings/SettingsLicenses";
const settingsAboutFirstUser = new SettingsAboutScreen();
const settingsLicensesFirstUser = new SettingsLicensesScreen();

export default async function settingsLicenses() {
  it("Settings Licenses - Validate header/description texts and license button are present", async () => {
    // Go to Settings Licenses Screen
    await settingsAboutFirstUser.goToLicensesSettings();
    await settingsLicensesFirstUser.waitForIsShown(true);

    // Validate the header and description texts from MIT license
    const licenseHeader = await settingsLicensesFirstUser.licenseHeader;
    const licenseDescription =
      await settingsLicensesFirstUser.licenseDescription;
    await expect(licenseHeader).toHaveTextContaining("UPLINK");
    await expect(licenseDescription).toHaveTextContaining(
      "Both code and icons are under the MIT license.",
    );

    // Validate MIT License button is present
    await settingsLicensesFirstUser.licenseButton.waitForExist();
  });
}
