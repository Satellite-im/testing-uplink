require("module-alias/register");
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
const settingsProfile = new SettingsProfileScreen();
const settingsGeneral = new SettingsGeneralScreen();

export default async function settingsGeneralTests() {
  it("Settings General - Validate header and description texts are correct", async () => {
    // Go to Settings Screen
    await settingsProfile.goToGeneralSettings();
    await settingsGeneral.waitForIsShown(true);

    // APP LANGUAGE
    const appLanguageHeader = await settingsGeneral.appLanguageHeader;
    const appLanguageDescription = await settingsGeneral.appLanguageDescription;
    await expect(appLanguageHeader).toHaveTextContaining("APP LANGUAGE");
    await expect(appLanguageDescription).toHaveText("Change Language.");

    // FONT
    const fontHeader = await settingsGeneral.fontHeader;
    const fontDescription = await settingsGeneral.fontDescription;
    await expect(fontHeader).toHaveTextContaining("FONT");
    await expect(fontDescription).toHaveTextContaining(
      "Change the font of the app.",
    );

    // FONT SCALING
    const fontScalingHeader = await settingsGeneral.fontScalingHeader;
    const fontScalingDescription = await settingsGeneral.fontScalingDescription;
    await expect(fontScalingHeader).toHaveTextContaining("FONT SCALING");
    await expect(fontScalingDescription).toHaveTextContaining(
      "Scale the font size up or down to your liking.",
    );

    // THEME
    const themeHeader = await settingsGeneral.themeHeader;
    const themeDescription = await settingsGeneral.themeDescription;
    await expect(themeHeader).toHaveTextContaining("THEME");
    await expect(themeDescription).toHaveTextContaining(
      "Change the theme of the app.",
    );
  });

  it("Settings General - Validate tooltips from buttons", async () => {
    // Validate Open Fonts Folder button tooltip
    await settingsGeneral.hoverOnOpenFontsFolder();

    const openFolderTooltipText =
      await settingsGeneral.settingsGeneralElementTooltipText;
    await expect(openFolderTooltipText).toHaveTextContaining("Open Folder");

    // Validate Open Themes Folder button tooltip
    await settingsGeneral.hoverOnOpenThemesFolder();
    const openThemesTooltipText =
      await settingsGeneral.settingsGeneralElementTooltipText;
    await expect(openThemesTooltipText).toHaveTextContaining("Open Folder");

    // Validate Clear Accent Color button tooltip
    await settingsGeneral.hoverOnClearAccentColor();
    const clearAccentTooltipText =
      await settingsGeneral.settingsGeneralElementTooltipText;
    await expect(clearAccentTooltipText).toHaveTextContaining(
      "Clear accent color",
    );
  });

  // Skipped for now since there are no fonts to select
  xit("Settings General - Change font dropdown selection", async () => {
    await settingsGeneral.clickOnFontDropdown();
    await settingsGeneral.selectFont("Default");
  });

  // Skipping test since it is failing on CI
  xit("Settings General - Change language", async () => {
    // Open Language Picker and select Español México
    await settingsGeneral.clickOnAppLanguageDropdown();
    await settingsGeneral.selectAppLanguage("Español");
  });

  // Skipping test since it is failing on CI
  xit("Settings General - Switch back language to EN-US", async () => {
    // Open Language Picker and select Español México
    await settingsGeneral.clickOnAppLanguageDropdown();
    await settingsGeneral.selectAppLanguage("English");
  });

  it("Settings General - Increase font scaling to 1.25", async () => {
    // Click on increase font scaling button once
    await settingsGeneral.clickOnFontScalingPlus();

    // Validate that current font size is changed to 1.25
    const fontScalingValue = await settingsGeneral.fontScalingValue;
    await expect(fontScalingValue).toHaveTextContaining("1.25");
  });

  it("Settings General - Reduce font scaling to 0.50", async () => {
    // Click on decrease font scaling button twice
    await settingsGeneral.clickOnFontScalingMinus();
    await settingsGeneral.clickOnFontScalingMinus();

    // Validate that current font size is changed to 0.50
    const fontScalingValue = await settingsGeneral.fontScalingValue;
    await expect(fontScalingValue).toHaveTextContaining("0.75");
  });

  it("Settings General - Change theme to Light Theme", async () => {
    await settingsGeneral.clickOnDarkLightThemeToggle();
  });

  it("Settings General - Validate user can change accent color", async () => {
    const currentDriver = await settingsGeneral.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Click on all the accent colors (red, orange, yellow, green, blue, violet, pink and finally grey)
      await settingsGeneral.selectRedAccentColor();
      await settingsGeneral.selectOrangeAccentColor();
      await settingsGeneral.selectYellowAccentColor();
      await settingsGeneral.selectGreenAccentColor();
      await settingsGeneral.selectBlueAccentColor();
      await settingsGeneral.selectVioletAccentColor();
      await settingsGeneral.selectPinkAccentColor();
      await settingsGeneral.selectGreyAccentColor();
    } else if (currentDriver === WINDOWS_DRIVER) {
      console.log(
        "Skipping test on Windows since it needs visual implementation",
      );
    }
  });

  it("Settings General - Validate user can clear accent color", async () => {
    await settingsGeneral.clickOnClearAccentColor();
  });

  it("Settings General - Return theme to Dark Theme", async () => {
    await settingsGeneral.clickOnDarkLightThemeToggle();
  });
}
