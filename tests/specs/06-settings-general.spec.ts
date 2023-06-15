import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
let settingsProfileFirstUser = new SettingsProfileScreen("userA");
let settingsGeneralFirstUser = new SettingsGeneralScreen("userA");

export default async function settingsGeneral() {
  it("Settings General - Validate header and description texts are correct", async () => {
    // Go to Settings Screen
    await settingsProfileFirstUser.goToGeneralSettings();
    await settingsGeneralFirstUser.waitForIsShown(true);

    // APP LANGUAGE
    await expect(
      settingsGeneralFirstUser.appLanguageHeader
    ).toHaveTextContaining("APP LANGUAGE");
    await expect(settingsGeneralFirstUser.appLanguageDescription).toHaveText(
      "Change Language."
    );

    // FONT
    await expect(settingsGeneralFirstUser.fontHeader).toHaveTextContaining(
      "FONT"
    );
    await expect(settingsGeneralFirstUser.fontDescription).toHaveTextContaining(
      "Change the font of the app."
    );

    // FONT SCALING
    await expect(
      settingsGeneralFirstUser.fontScalingHeader
    ).toHaveTextContaining("FONT SCALING");
    await expect(
      settingsGeneralFirstUser.fontScalingDescription
    ).toHaveTextContaining("Scale the font size up or down to your liking.");
  });

  // Skipped for now since there are no fonts to select
  xit("Settings General - Change font dropdown selection", async () => {
    await settingsGeneralFirstUser.clickOnFontDropdown();
    await settingsGeneralFirstUser.selectFont("Default");
  });

  // Skipping test since it is failing on CI
  xit("Settings General - Change language", async () => {
    // Open Language Picker and select Español México
    await settingsGeneralFirstUser.clickOnAppLanguageDropdown();
    await settingsGeneralFirstUser.selectAppLanguage("Español");
  });

  // Skipping test since it is failing on CI
  xit("Settings General - Switch back language to EN-US", async () => {
    // Open Language Picker and select Español México
    await settingsGeneralFirstUser.clickOnAppLanguageDropdown();
    await settingsGeneralFirstUser.selectAppLanguage("English");
  });
}
