import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";

export default async function settingsGeneral() {
  it("Settings General - Validate header and description texts are correct", async () => {
    // Go to Settings Screen
    await SettingsProfileScreen.goToGeneralSettings();
    await SettingsGeneralScreen.waitForIsShown(true);

    // UPLINK OVERLAY
    await expect(
      SettingsGeneralScreen.uplinkOverlayHeader
    ).toHaveTextContaining("UPLINK OVERLAY");
    await expect(
      SettingsGeneralScreen.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Enable the on screen Uplink overlay. This will show active call information, as well as allow you to add custom widgets to your screen."
    );

    // APP LANGUAGE
    await expect(SettingsGeneralScreen.appLanguageHeader).toHaveTextContaining(
      "APP LANGUAGE"
    );
    await expect(SettingsGeneralScreen.appLanguageDescription).toHaveText(
      "Change Language."
    );

    // THEME
    await expect(SettingsGeneralScreen.themeHeader).toHaveTextContaining(
      "THEME"
    );
    await expect(SettingsGeneralScreen.themeDescription).toHaveTextContaining(
      "Change the theme of the app."
    );

    // FONT
    await expect(SettingsGeneralScreen.fontHeader).toHaveTextContaining("FONT");
    await expect(SettingsGeneralScreen.fontDescription).toHaveTextContaining(
      "Change the font of the app."
    );

    // FONT SCALING
    await expect(SettingsGeneralScreen.fontScalingHeader).toHaveTextContaining(
      "FONT SCALING"
    );
    await expect(
      SettingsGeneralScreen.fontScalingDescription
    ).toHaveTextContaining("Scale the font size up or down to your liking.");
  });

  it("Settings General - Toggle switches to enabled", async () => {
    // Click on Uplink Overlay to activate switch and then validate that toggle has now value = "1" (enabled)
    await SettingsGeneralScreen.clickOnUplinkOverlay();
    const toggleElement =
      await SettingsGeneralScreen.uplinkOverlayControllerValue;
    const uplinkOverlayState = await SettingsGeneralScreen.getToggleState(
      toggleElement
    );
    await expect(uplinkOverlayState).toEqual("1");
  });

  it("Settings General - Toggle switches to disabled", async () => {
    // Click on Uplink Overlay to activate switch and then validate that toggle has now value = "0" (disabled)
    await SettingsGeneralScreen.clickOnUplinkOverlay();
    const toggleElement =
      await SettingsGeneralScreen.uplinkOverlayControllerValue;
    const uplinkOverlayState = await SettingsGeneralScreen.getToggleState(
      toggleElement
    );
    await expect(uplinkOverlayState).toEqual("0");
  });

  // Skipped for now since there are no themes to select
  xit("Settings General - Change theme dropdown selection", async () => {
    await SettingsGeneralScreen.clickOnThemeDropdown();
    await SettingsGeneralScreen.selectTheme("Default");
  });

  // Skipped for now since there are no fonts to select
  xit("Settings General - Change font dropdown selection", async () => {
    await SettingsGeneralScreen.clickOnFontDropdown();
    await SettingsGeneralScreen.selectFont("Default");
  });

  // Skipping test since it is failing on CI
  xit("Settings General - Change language", async () => {
    // Open Language Picker and select Español México
    await SettingsGeneralScreen.clickOnAppLanguageDropdown();
    await SettingsGeneralScreen.selectAppLanguage("Español");

    // Validate that language was changed to Español (México)
    await expect(
      SettingsGeneralScreen.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Habilitar la superposición de pantalla Uplink. Esto mostrará la información de llamadas activas y también te permitirá agregar widgets personalizados a tu pantalla."
    );
  });

  // Skipping test since it is failing on CI
  xit("Settings General - Switch back language to EN-US", async () => {
    // Open Language Picker and select Español México
    await SettingsGeneralScreen.clickOnAppLanguageDropdown();
    await SettingsGeneralScreen.selectAppLanguage("English");

    // Validate that language was changed back to English (USA)
    await expect(
      SettingsGeneralScreen.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Enable the on screen Uplink overlay. This will show active call information, as well as allow you to add custom widgets to your screen."
    );
  });
}
