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

    // THEME
    await expect(settingsGeneralFirstUser.themeHeader).toHaveTextContaining(
      "THEME"
    );
    await expect(
      settingsGeneralFirstUser.themeDescription
    ).toHaveTextContaining("Change the theme of the app.");

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

  // Skipped for now since there are no themes to select
  xit("Settings General - Change theme dropdown selection", async () => {
    await settingsGeneralFirstUser.clickOnThemeDropdown();
    await settingsGeneralFirstUser.selectTheme("Default");
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

    // Validate that language was changed to Español (México)
    await expect(
      settingsGeneralFirstUser.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Habilitar la superposición de pantalla Uplink. Esto mostrará la información de llamadas activas y también te permitirá agregar widgets personalizados a tu pantalla."
    );
  });

  // Skipping test since it is failing on CI
  xit("Settings General - Switch back language to EN-US", async () => {
    // Open Language Picker and select Español México
    await settingsGeneralFirstUser.clickOnAppLanguageDropdown();
    await settingsGeneralFirstUser.selectAppLanguage("English");

    // Validate that language was changed back to English (USA)
    await expect(
      settingsGeneralFirstUser.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Enable the on screen Uplink overlay. This will show active call information, as well as allow you to add custom widgets to your screen."
    );
  });
}
