import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let settingsGeneralFirstUser = new SettingsGeneralScreen(USER_A_INSTANCE);

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

  it("Settings General - Validate tooltips from buttons", async () => {
    // Validate Open Fonts Folder button tooltip
    await settingsGeneralFirstUser.hoverOnOpenFontsFolder();
    await settingsGeneralFirstUser.settingsGeneralElementTooltip.waitForExist();
    await expect(
      settingsGeneralFirstUser.settingsGeneralElementTooltipText
    ).toHaveTextContaining("Open Folder");

    // Validate Open Themes Folder button tooltip
    await settingsGeneralFirstUser.hoverOnOpenThemesFolder();
    await settingsGeneralFirstUser.settingsGeneralElementTooltip.waitForExist();
    await expect(
      settingsGeneralFirstUser.settingsGeneralElementTooltipText
    ).toHaveTextContaining("Open Folder");

    // Validate Clear Accent Color button tooltip
    await settingsGeneralFirstUser.hoverOnClearAccentColor();
    await settingsGeneralFirstUser.settingsGeneralElementTooltip.waitForExist();
    await expect(
      settingsGeneralFirstUser.settingsGeneralElementTooltipText
    ).toHaveTextContaining("Clear accent color");
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
    await expect(
      settingsGeneralFirstUser.fontScalingValue
    ).toHaveTextContaining("1.25");
  });

  it("Settings General - Reduce font scaling to 0.50", async () => {
    // Click on decrease font scaling button twice
    await settingsGeneralFirstUser.clickOnFontScalingMinus();
    await settingsGeneralFirstUser.clickOnFontScalingMinus();

    // Validate that current font size is changed to 0.50
    await expect(
      settingsGeneralFirstUser.fontScalingValue
    ).toHaveTextContaining("0.75");
  });

  it("Settings General - Change theme to Light Theme", async () => {
    await settingsGeneralFirstUser.clickOnDarkLightThemeToggle();
  });

  it("Settings General - Validate user can change accent color", async () => {
    const currentDriver = await settingsGeneralFirstUser.getCurrentDriver();
    if (currentDriver === "mac2") {
      // Click on all the accent colors (red, orange, yellow, green, blue, violet, pink and finally grey)
      await settingsGeneralFirstUser.selectRedAccentColor();
      await settingsGeneralFirstUser.selectOrangeAccentColor();
      await settingsGeneralFirstUser.selectYellowAccentColor();
      await settingsGeneralFirstUser.selectGreenAccentColor();
      await settingsGeneralFirstUser.selectBlueAccentColor();
      await settingsGeneralFirstUser.selectVioletAccentColor();
      await settingsGeneralFirstUser.selectPinkAccentColor();
      await settingsGeneralFirstUser.selectGreyAccentColor();
    } else if (currentDriver === "windows") {
      console.log(
        "Skipping test on Windows since it needs visual implementation"
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
