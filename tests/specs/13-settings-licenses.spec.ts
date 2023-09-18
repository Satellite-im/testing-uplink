import "module-alias/register";
import SettingsAboutScreen from "@screenobjects/settings/SettingsAboutScreen";
import SettingsLicensesScreen from "@screenobjects/settings/SettingsLicenses";
import { USER_A_INSTANCE } from "@helpers/constants";
let settingsAboutFirstUser = new SettingsAboutScreen(USER_A_INSTANCE);
let settingsLicensesFirstUser = new SettingsLicensesScreen(USER_A_INSTANCE);

export default async function settingsLicenses() {
  it("Settings Licenses - Validate header/description texts and license button are present", async () => {
    // Go to Settings Licenses Screen
    await settingsAboutFirstUser.goToLicensesSettings();
    await settingsLicensesFirstUser.waitForIsShown(true);

    // Validate the header and description texts from Heroicons
    const heroiconsHeader = await settingsLicensesFirstUser.heroiconsHeader;
    const heroiconsDescription =
      await settingsLicensesFirstUser.heroiconsDescription;
    await expect(heroiconsHeader).toHaveTextContaining("HEROICONS");
    await expect(heroiconsDescription).toHaveTextContaining(
      "We have expanded upon the heroicons library we offer any additional icons under the same license as the original author."
    );

    // Validate MIT License button is present
    const heroiconsButton = await settingsLicensesFirstUser.heroiconsButton;
    await heroiconsButton.waitForExist();
  });
}
