require("module-alias/register");
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";

export default async function settingsGeneralTests() {
  it("Settings General - Validate header and description texts are correct", async () => {
    // Go to Settings Screen
    await SettingsProfileScreen.goToGeneralSettings();
    await SettingsGeneralScreen.waitForIsShown(true);

    // APP LANGUAGE
    const appLanguageHeader = await SettingsGeneralScreen.appLanguageHeader;
    const appLanguageDescription =
      await SettingsGeneralScreen.appLanguageDescription;
    await expect(appLanguageHeader).toHaveText("APP LANGUAGE");
    await expect(appLanguageDescription).toHaveText("Change Language.");

    // FONT
    const fontHeader = await SettingsGeneralScreen.fontHeader;
    const fontDescription = await SettingsGeneralScreen.fontDescription;
    await expect(fontHeader).toHaveText("FONT");
    await expect(fontDescription).toHaveText("Change the font of the app.");

    // FONT SCALING
    const fontScalingHeader = await SettingsGeneralScreen.fontScalingHeader;
    const fontScalingDescription =
      await SettingsGeneralScreen.fontScalingDescription;
    await expect(fontScalingHeader).toHaveText("FONT SCALING");
    await expect(fontScalingDescription).toHaveText(
      "Scale the font size up or down to your liking.",
    );

    // THEME
    const themeHeader = await SettingsGeneralScreen.themeHeader;
    const themeDescription = await SettingsGeneralScreen.themeDescription;
    await expect(themeHeader).toHaveText("THEME");
    await expect(themeDescription).toHaveText("Change the theme of the app.");
  });

  it("Settings General - Validate tooltips from buttons", async () => {
    // Validate Open Fonts Folder button tooltip
    await SettingsGeneralScreen.hoverOnOpenFontsFolder();

    const openFolderTooltipText =
      await SettingsGeneralScreen.settingsGeneralElementTooltipText;
    await expect(openFolderTooltipText).toHaveText("Open Folder");

    // Validate Open Themes Folder button tooltip
    await SettingsGeneralScreen.hoverOnOpenThemesFolder();
    const openThemesTooltipText =
      await SettingsGeneralScreen.settingsGeneralElementTooltipText;
    await expect(openThemesTooltipText).toHaveText("Open Folder");

    // Validate Clear Accent Color button tooltip
    await SettingsGeneralScreen.hoverOnClearAccentColor();
    const clearAccentTooltipText =
      await SettingsGeneralScreen.settingsGeneralElementTooltipText;
    await expect(clearAccentTooltipText).toHaveText("Clear accent color");
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
  });

  // Skipping test since it is failing on CI
  xit("Settings General - Switch back language to EN-US", async () => {
    // Open Language Picker and select Español México
    await SettingsGeneralScreen.clickOnAppLanguageDropdown();
    await SettingsGeneralScreen.selectAppLanguage("English");
  });

  it("Settings General - Increase font scaling to 1.25", async () => {
    // Click on increase font scaling button once
    await SettingsGeneralScreen.clickOnFontScalingPlus();

    // Validate that current font size is changed to 1.25
    const fontScalingValue = await SettingsGeneralScreen.fontScalingValue;
    await expect(fontScalingValue).toHaveText("1.25");
  });

  it("Settings General - Reduce font scaling to 0.75", async () => {
    // Click on decrease font scaling button twice
    await SettingsGeneralScreen.clickOnFontScalingMinus();
    await SettingsGeneralScreen.clickOnFontScalingMinus();

    // Validate that current font size is changed to 0.75
    const fontScalingValue = await SettingsGeneralScreen.fontScalingValue;
    await expect(fontScalingValue).toHaveText("0.75");
  });

  it("Settings General - Change theme to Light Theme", async () => {
    await SettingsGeneralScreen.clickOnDarkLightThemeToggle();
  });

  it("Settings General - Validate user can change accent color", async () => {
    const currentDriver = await SettingsGeneralScreen.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Click on all the accent colors (red, orange, yellow, green, blue, violet, pink and finally grey)
      await SettingsGeneralScreen.selectRedAccentColor();
      await SettingsGeneralScreen.selectOrangeAccentColor();
      await SettingsGeneralScreen.selectYellowAccentColor();
      await SettingsGeneralScreen.selectGreenAccentColor();
      await SettingsGeneralScreen.selectBlueAccentColor();
      await SettingsGeneralScreen.selectVioletAccentColor();
      await SettingsGeneralScreen.selectPinkAccentColor();
      await SettingsGeneralScreen.selectGreyAccentColor();
    } else if (currentDriver === WINDOWS_DRIVER) {
      console.log(
        "Skipping test on Windows since it needs visual implementation",
      );
    }
  });

  it("Settings General - Validate user can clear accent color", async () => {
    await SettingsGeneralScreen.clickOnClearAccentColor();
  });

  it("Settings General - Return theme to Dark Theme", async () => {
    await SettingsGeneralScreen.clickOnDarkLightThemeToggle();
  });
}
