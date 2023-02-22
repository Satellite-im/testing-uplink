import FriendsScreen from "../screenobjects/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import { loginWithRandomUser, showMainMenu } from "../helpers/commands";

describe("Settings - General - Tests", async () => {
  it("Settings General - Validate header and description texts are correct", async () => {
    // Login with a random user, show main menu and go to Settings Screen
    await loginWithRandomUser();
    await showMainMenu();
    await FriendsScreen.goToSettings();
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
    await expect(
      await SettingsGeneralScreen.splashScreenHeader
    ).toHaveTextContaining("SPLASH SCREEN");
    await expect(
      await SettingsGeneralScreen.splashScreenDescription
    ).toHaveTextContaining(
      "Disabling the splash screen could speed up load times."
    );
    await expect(await SettingsGeneralScreen.themeHeader).toHaveTextContaining(
      "THEME"
    );
    await expect(
      await SettingsGeneralScreen.themeDescription
    ).toHaveTextContaining("Change the theme of the app.");
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
    // Click on Uplink Overlay and Splash Screen to activate toggles
    await SettingsGeneralScreen.clickOnUplinkOverlay();
    await SettingsGeneralScreen.clickOnSplashScreen();

    // Validate that both toggles have now value = '1' (active)
    await expect(
      await SettingsGeneralScreen.uplinkOverlayCheckbox
    ).toHaveAttrContaining("value", "1");
    await expect(
      await SettingsGeneralScreen.splashScreenCheckbox
    ).toHaveAttrContaining("value", "1");
  });

  it("Settings General - Toggle switches to disabled", async () => {
    // Click on Uplink Overlay and Splash Screen to deactivate toggles
    await SettingsGeneralScreen.clickOnUplinkOverlay();
    await SettingsGeneralScreen.clickOnSplashScreen();

    // Validate that both toggles have now value = '0' (disabled)
    await expect(
      await SettingsGeneralScreen.uplinkOverlayCheckbox
    ).toHaveAttrContaining("value", "0");
    await expect(
      await SettingsGeneralScreen.splashScreenCheckbox
    ).toHaveAttrContaining("value", "0");
  });

  // Skipped for now since there are no themes to select
  xit("Settings General - Change theme dropdown selection", async () => {
    await SettingsGeneralScreen.clickOnThemeDropdown();
    await SettingsGeneralScreen.selectTheme("Default");
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
});
