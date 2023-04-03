import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";

export default async function settingsGeneral() {
  it("Settings General - Validate header and description texts are correct", async () => {
    // Go to Settings Screen
    await SettingsProfileScreen.goToGeneralSettings();
    await SettingsGeneralScreen.waitForIsShown(true);

    // Start validations
    await expect(
      await SettingsGeneralScreen.uplinkOverlayHeader
    ).toHaveTextContaining("UPLINK OVERLAY");
    await expect(
      await SettingsGeneralScreen.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Enable the on screen Uplink overlay. This will show active call information, as well as allow you to add custom widgets to your screen."
    );
    await expect(await SettingsGeneralScreen.themeHeader).toHaveTextContaining(
      "THEME"
    );
    await expect(
      await SettingsGeneralScreen.themeDescription
    ).toHaveTextContaining("Change the theme of the app.");
    await expect(await SettingsGeneralScreen.fontHeader).toHaveTextContaining(
      "FONT"
    );
    await expect(
      await SettingsGeneralScreen.fontDescription
    ).toHaveTextContaining("Change the font of the app.");
    await expect(
      await SettingsGeneralScreen.resetThemeHeader
    ).toHaveTextContaining("RESET THEME");
    await expect(
      await SettingsGeneralScreen.resetThemeDescription
    ).toHaveTextContaining("Reset the theme to the default.");
    await expect(
      await SettingsGeneralScreen.appLanguageHeader
    ).toHaveTextContaining("APP LANGUAGE");
    await expect(await SettingsGeneralScreen.appLanguageDescription).toHaveText(
      "Change Language"
    );
  });

  it("Settings General - Toggle switches to enabled", async () => {
    // Click on Uplink Overlay to activate switch and then validate that toggle has now value = "1" (enabled)
    await SettingsGeneralScreen.clickOnUplinkOverlay();
    const uplinkOverlayState = await SettingsGeneralScreen.getToggleState(
      await SettingsGeneralScreen.uplinkOverlayControllerValue
    );
    expect(uplinkOverlayState).toEqual("1");
  });

  it("Settings General - Toggle switches to disabled", async () => {
    // Click on Uplink Overlay to activate switch and then validate that toggle has now value = "0" (disabled)
    await SettingsGeneralScreen.clickOnUplinkOverlay();
    const uplinkOverlayState = await SettingsGeneralScreen.getToggleState(
      await SettingsGeneralScreen.uplinkOverlayControllerValue
    );
    expect(uplinkOverlayState).toEqual("0");
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

  // Skipped for now since button does not perform any action
  xit("Settings General - Clear theme button", async () => {
    await SettingsGeneralScreen.clickOnResetTheme();
  });

  it("Settings General - Change language", async () => {
    // Open Language Picker and select Español México
    await SettingsGeneralScreen.clickOnAppLanguageDropdown();
    await SettingsGeneralScreen.selectAppLanguage("Español (México)");

    // Validate that language was changed to Español (México)
    await expect(
      await SettingsGeneralScreen.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Habilitar la superposición de pantalla Uplink. Esto mostrará la información de llamadas activas y también te permitirá agregar widgets personalizados a tu pantalla."
    );
  });

  it("Settings General - Switch back language to EN-US", async () => {
    // Open Language Picker and select Español México
    await SettingsGeneralScreen.clickOnAppLanguageDropdown();
    await SettingsGeneralScreen.selectAppLanguage("English (USA)");

    // Validate that language was changed back to English (USA)
    await expect(
      await SettingsGeneralScreen.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Enable the on screen Uplink overlay. This will show active call information, as well as allow you to add custom widgets to your screen."
    );
  });
}
