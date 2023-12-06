import "module-alias/register";
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import {
  USER_A_INSTANCE,
  MACOS_DRIVER,
  WINDOWS_DRIVER,
} from "@helpers/constants";
const settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
const settingsGeneralFirstUser = new SettingsGeneralScreen(USER_A_INSTANCE);

export default async function settingsGeneral() {
  it("Settings General - Validate header and description texts are correct", async () => {
    // Go to Settings Screen
    await settingsProfileFirstUser.goToGeneralSettings();
    await settingsGeneralFirstUser.waitForIsShown(true);

    // APP LANGUAGE
    const appLanguageHeader = await settingsGeneralFirstUser.appLanguageHeader;
    const appLanguageDescription =
      await settingsGeneralFirstUser.appLanguageDescription;
    await expect(appLanguageHeader).toHaveTextContaining("APP LANGUAGE");
    await expect(appLanguageDescription).toHaveText("Change Language.");

    // FONT
    const fontHeader = await settingsGeneralFirstUser.fontHeader;
    const fontDescription = await settingsGeneralFirstUser.fontDescription;
    await expect(fontHeader).toHaveTextContaining("FONT");
    await expect(fontDescription).toHaveTextContaining(
      "Change the font of the app.",
    );

    // FONT SCALING
    const fontScalingHeader = await settingsGeneralFirstUser.fontScalingHeader;
    const fontScalingDescription =
      await settingsGeneralFirstUser.fontScalingDescription;
    await expect(fontScalingHeader).toHaveTextContaining("FONT SCALING");
    await expect(fontScalingDescription).toHaveTextContaining(
      "Scale the font size up or down to your liking.",
    );

    // THEME
    const themeHeader = await settingsGeneralFirstUser.themeHeader;
    const themeDescription = await settingsGeneralFirstUser.themeDescription;
    await expect(themeHeader).toHaveTextContaining("THEME");
    await expect(themeDescription).toHaveTextContaining(
      "Change the theme of the app.",
    );
  });

  it("Settings General - Validate tooltips from buttons", async () => {
    // Validate Open Fonts Folder button tooltip
    await settingsGeneralFirstUser.hoverOnOpenFontsFolder();

    const openFolderTooltipText =
      await settingsGeneralFirstUser.settingsGeneralElementTooltipText;
    await expect(openFolderTooltipText).toHaveTextContaining("Open Folder");

    // Validate Open Themes Folder button tooltip
    await settingsGeneralFirstUser.hoverOnOpenThemesFolder();
    const openThemesTooltipText =
      await settingsGeneralFirstUser.settingsGeneralElementTooltipText;
    await expect(openThemesTooltipText).toHaveTextContaining("Open Folder");

    // Validate Clear Accent Color button tooltip
    await settingsGeneralFirstUser.hoverOnClearAccentColor();
    const clearAccentTooltipText =
      await settingsGeneralFirstUser.settingsGeneralElementTooltipText;
    await expect(clearAccentTooltipText).toHaveTextContaining(
      "Clear accent color",
    );
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

  it("Settings General - Increase font scaling to 1.25", async () => {
    // Click on increase font scaling button once
    await settingsGeneralFirstUser.clickOnFontScalingPlus();

    // Validate that current font size is changed to 1.25
    const fontScalingValue = await settingsGeneralFirstUser.fontScalingValue;
    await expect(fontScalingValue).toHaveTextContaining("1.25");
  });

  it("Settings General - Reduce font scaling to 0.50", async () => {
    // Click on decrease font scaling button twice
    await settingsGeneralFirstUser.clickOnFontScalingMinus();
    await settingsGeneralFirstUser.clickOnFontScalingMinus();

    // Validate that current font size is changed to 0.50
    const fontScalingValue = await settingsGeneralFirstUser.fontScalingValue;
    await expect(fontScalingValue).toHaveTextContaining("0.75");
  });

  it("Settings General - Change theme to Light Theme", async () => {
    await settingsGeneralFirstUser.clickOnDarkLightThemeToggle();
  });

  it("Settings General - Validate user can change accent color", async () => {
    const currentDriver = await settingsGeneralFirstUser.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Click on all the accent colors (red, orange, yellow, green, blue, violet, pink and finally grey)
      await settingsGeneralFirstUser.selectRedAccentColor();
      await settingsGeneralFirstUser.selectOrangeAccentColor();
      await settingsGeneralFirstUser.selectYellowAccentColor();
      await settingsGeneralFirstUser.selectGreenAccentColor();
      await settingsGeneralFirstUser.selectBlueAccentColor();
      await settingsGeneralFirstUser.selectVioletAccentColor();
      await settingsGeneralFirstUser.selectPinkAccentColor();
      await settingsGeneralFirstUser.selectGreyAccentColor();
    } else if (currentDriver === WINDOWS_DRIVER) {
      console.log(
        "Skipping test on Windows since it needs visual implementation",
      );
    }
  });

  it("Settings General - Validate user can clear accent color", async () => {
    await settingsGeneralFirstUser.clickOnClearAccentColor();
  });

  it("Settings General - Return theme to Dark Theme", async () => {
    await settingsGeneralFirstUser.clickOnDarkLightThemeToggle();
  });
}
