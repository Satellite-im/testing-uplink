require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_GENERAL: "~settings-general",
};

const SELECTORS_WINDOWS = {
  ACCENT_COLOR_BUTTON: "<Group>",
  APP_LANGUAGE_SECTION: '[name="app-language-section"]',
  CLEAR_ACCENT_COLOR_BUTTON: "<Button>",
  COLOR_SECTION: '[name="color-section"]',
  DARK_LIGHT_THEME_TOGGLE: '[name="dark-light-toggle"]',
  DROPDOWN_MENU: "<ComboBox>",
  DROPDOWN_OPTION: '[name="Selector Option"]',
  FONT_SECTION: '[name="font-section"]',
  FONT_SCALING_SECTION: '[name="font-scaling-section"]',
  OPEN_FONTS_FOLDER_BUTTON: '[name="open-fonts-folder-button"]',
  OPEN_THEMES_FOLDER_BUTTON: '[name="open-themes-folder-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SLIDE_SELECTOR: '[name="slide-selector"]',
  SLIDE_SELECTOR_BUTTON_MINUS: '[name="slide-selector-minus"]',
  SLIDE_SELECTOR_BUTTON_PLUS: '[name="slide-selector-plus"]',
  SLIDE_SELECTOR_VALUE: '[name="slide-selector-value"]',
  SLIDE_SELECTOR_VALUE_TEXT: "<Text>",
  SWITCH_SLIDER: '[name="Switch Slider"]',
  THEME_SECTION: '[name="theme-section"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
};

const SELECTORS_MACOS = {
  ACCENT_COLOR_BUTTON: "-ios class chain:**/XCUIElementTypeGroup",
  APP_LANGUAGE_SECTION: "~app-language-section",
  CLEAR_ACCENT_COLOR_BUTTON: "-ios class chain:**/XCUIElementTypeButton",
  COLOR_SECTION: "~color-section",
  DARK_LIGHT_THEME_TOGGLE: "~dark-light-toggle",
  DROPDOWN_MENU: "~Selector",
  DROPDOWN_OPTION: "~Selector Option",
  FONT_SECTION: "~font-section",
  FONT_SCALING_SECTION: "~font-scaling-section",
  OPEN_FONTS_FOLDER_BUTTON: "~open-fonts-folder-button",
  OPEN_THEMES_FOLDER_BUTTON: "~open-themes-folder-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SLIDE_SELECTOR: "~slide-selector",
  SLIDE_SELECTOR_BUTTON_MINUS: "~slide-selector-minus",
  SLIDE_SELECTOR_BUTTON_PLUS: "~slide-selector-plus",
  SLIDE_SELECTOR_VALUE: "~slide-selector-value",
  SLIDE_SELECTOR_VALUE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SWITCH_SLIDER: "~Switch Slider",
  THEME_SECTION: "~theme-section",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsGeneralScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_GENERAL);
  }

  get accentColorButtonBlue() {
    return $(SELECTORS.COLOR_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[4];
  }

  get accentColorButtonGreen() {
    return $(SELECTORS.COLOR_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[3];
  }

  get accentColorButtonGrey() {
    return $(SELECTORS.COLOR_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[7];
  }

  get accentColorButtonOrange() {
    return $(SELECTORS.COLOR_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[1];
  }

  get accentColorButtonPink() {
    return $(SELECTORS.COLOR_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[6];
  }

  get accentColorButtonRed() {
    return $(SELECTORS.COLOR_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[0];
  }

  get accentColorButtonViolet() {
    return $(SELECTORS.COLOR_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[5];
  }

  get accentColorButtonYellow() {
    return $(SELECTORS.COLOR_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[2];
  }

  get appLanguageDescription() {
    return $(SELECTORS.APP_LANGUAGE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get appLanguageHeader() {
    return $(SELECTORS.APP_LANGUAGE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get appLanguageDropdown() {
    return $(SELECTORS.APP_LANGUAGE_SECTION).$(SELECTORS.DROPDOWN_MENU);
  }

  get clearAccentColorButton() {
    return $(SELECTORS.COLOR_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.CLEAR_ACCENT_COLOR_BUTTON);
  }

  get darkLightThemeToggle() {
    return $(SELECTORS.THEME_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.DARK_LIGHT_THEME_TOGGLE);
  }

  get fontDescription() {
    return $(SELECTORS.FONT_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get fontHeader() {
    return $(SELECTORS.FONT_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get fontDropdown() {
    return $(SELECTORS.FONT_SECTION).$(SELECTORS.DROPDOWN_MENU);
  }

  get fontScalingDescription() {
    return $(SELECTORS.FONT_SCALING_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get fontScalingHeader() {
    return $(SELECTORS.FONT_SCALING_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get fontScalingButtonMinus() {
    return $(SELECTORS.FONT_SCALING_SECTION)
      .$(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_BUTTON_MINUS);
  }

  get fontScalingButtonPlus() {
    return $(SELECTORS.FONT_SCALING_SECTION)
      .$(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_BUTTON_PLUS);
  }

  get fontScalingValue() {
    return $(SELECTORS.FONT_SCALING_SECTION)
      .$(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_VALUE)
      .$(SELECTORS.SLIDE_SELECTOR_VALUE_TEXT);
  }

  get openFontsFolderButton() {
    return $(SELECTORS.FONT_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.OPEN_FONTS_FOLDER_BUTTON);
  }

  get openThemesFolderButton() {
    return $(SELECTORS.THEME_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.OPEN_THEMES_FOLDER_BUTTON);
  }

  get settingsGeneral() {
    return $(SELECTORS.SETTINGS_GENERAL);
  }

  get settingsGeneralElementTooltip() {
    return $(SELECTORS.SETTINGS_GENERAL).$(SELECTORS.TOOLTIP);
  }

  get settingsGeneralElementTooltipText() {
    return $(SELECTORS.SETTINGS_GENERAL)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get slideSelector() {
    return $(SELECTORS.SLIDE_SELECTOR);
  }

  get slideSelectorButtonMinus() {
    return $(SELECTORS.SLIDE_SELECTOR).$(SELECTORS.SLIDE_SELECTOR_BUTTON_MINUS);
  }

  get slideSelectorButtonPlus() {
    return $(SELECTORS.SLIDE_SELECTOR).$(SELECTORS.SLIDE_SELECTOR_BUTTON_PLUS);
  }

  get slideSelectorValue() {
    return $(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_VALUE)
      .$(SELECTORS.SLIDE_SELECTOR_VALUE_TEXT);
  }

  get themeDescription() {
    return $(SELECTORS.THEME_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get themeHeader() {
    return $(SELECTORS.THEME_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get themeDropdown() {
    return $(SELECTORS.THEME_SECTION).$(SELECTORS.DROPDOWN_MENU);
  }

  // Click on buttons methods

  async clickOnAppLanguageDropdown() {
    await this.appLanguageDropdown.click();
  }

  async clickOnDarkLightThemeToggle() {
    await this.darkLightThemeToggle.click();
  }

  async clickOnFontDropdown() {
    await this.fontDropdown.click();
  }

  async clickOnFontScalingMinus() {
    await this.fontScalingButtonMinus.click();
  }

  async clickOnFontScalingPlus() {
    await this.fontScalingButtonPlus.click();
  }

  async clickOnOpenFontsFolder() {
    await this.openFontsFolderButton.click();
  }

  async clickOnOpenThemesFolder() {
    await this.openThemesFolderButton.click();
  }

  async clickOnThemeDropdown() {
    await this.themeDropdown.click();
  }

  async decreaseFontScale() {
    await this.fontScalingButtonMinus.click();
  }

  async getFontScaleValue() {
    await this.fontScalingValue.getText();
  }

  async increaseFontScale() {
    await this.fontScalingButtonPlus.click();
  }

  // Accent Color Selection Methods

  async clickOnClearAccentColor() {
    await this.clearAccentColorButton.click();
  }

  async selectBlueAccentColor() {
    await this.accentColorButtonBlue.click();
  }

  async selectGreenAccentColor() {
    await this.accentColorButtonGreen.click();
  }

  async selectGreyAccentColor() {
    await this.accentColorButtonGrey.click();
  }

  async selectOrangeAccentColor() {
    await this.accentColorButtonOrange.click();
  }

  async selectPinkAccentColor() {
    await this.accentColorButtonPink.click();
  }

  async selectRedAccentColor() {
    await this.accentColorButtonRed.click();
  }

  async selectVioletAccentColor() {
    await this.accentColorButtonViolet.click();
  }

  async selectYellowAccentColor() {
    await this.accentColorButtonYellow.click();
  }

  // Dropdown Selectors Methods

  async selectAppLanguage(language: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await $$("-ios class chain:**/XCUIElementTypePopUpButton")[0].addValue(
        language + "\n",
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      await $$('[name="settings-control"]')[0].addValue(language + "\uE007");
    }
  }

  async selectFont(font: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await $$("-ios class chain:**/XCUIElementTypePopUpButton")[1].addValue(
        font + "\n",
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      await $$('[name="settings-control"]')[2].addValue(font + "\uE007");
    }
  }

  async selectTheme(theme: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await $$("-ios class chain:**/XCUIElementTypePopUpButton")[2].addValue(
        theme + "\n",
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      await $$('[name="settings-control"]')[1].addValue(theme + "\uE007");
    }
  }

  // Hovering methods

  async hoverOnClearAccentColor() {
    const clearAccentButton = await this.clearAccentColorButton;
    await this.hoverOnElement(clearAccentButton);
  }

  async hoverOnOpenFontsFolder() {
    const openFontsButton = await this.openFontsFolderButton;
    await this.hoverOnElement(openFontsButton);
  }

  async hoverOnOpenThemesFolder() {
    const openThemesButton = await this.openThemesFolderButton;
    await this.hoverOnElement(openThemesButton);
  }

  async validateSettingsGeneralIsShown() {
    const settingsGeneral = await this.settingsGeneral;
    await settingsGeneral.waitForExist();
  }
}
