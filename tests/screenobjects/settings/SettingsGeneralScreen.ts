import "module-alias/register";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_GENERAL: "~settings-general",
};

const SELECTORS_WINDOWS = {
  ACCENT_COLOR_BUTTON: "<Group>",
  CLEAR_ACCENT_COLOR_BUTTON: "<Button>",
  DARK_LIGHT_THEME_TOGGLE: '[name="dark-light-toggle"]',
  DROPDOWN_MENU: "<ComboBox>",
  DROPDOWN_OPTION: '[name="Selector Option"]',
  OPEN_FONTS_FOLDER_BUTTON: '[name="open-fonts-folder-button"]',
  OPEN_THEMES_FOLDER_BUTTON: '[name="open-themes-folder-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SLIDE_SELECTOR: '[name="slide-selector"]',
  SLIDE_SELECTOR_BUTTON_MINUS: '[name="slide-selector-minus"]',
  SLIDE_SELECTOR_BUTTON_PLUS: '[name="slide-selector-plus"]',
  SLIDE_SELECTOR_VALUE: '[name="slide-selector-value"]',
  SLIDE_SELECTOR_VALUE_TEXT: "<Text>",
  SWITCH_SLIDER: '[name="Switch Slider"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
};

const SELECTORS_MACOS = {
  ACCENT_COLOR_BUTTON: "-ios class chain:**/XCUIElementTypeGroup",
  CLEAR_ACCENT_COLOR_BUTTON: "-ios class chain:**/XCUIElementTypeButton",
  DARK_LIGHT_THEME_TOGGLE: "~dark-light-toggle",
  DROPDOWN_MENU: "~Selector",
  DROPDOWN_OPTION: "~Selector Option",
  OPEN_FONTS_FOLDER_BUTTON: "~open-fonts-folder-button",
  OPEN_THEMES_FOLDER_BUTTON: "~open-themes-folder-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
  SLIDE_SELECTOR: "~slide-selector",
  SLIDE_SELECTOR_BUTTON_MINUS: "~slide-selector-minus",
  SLIDE_SELECTOR_BUTTON_PLUS: "~slide-selector-plus",
  SLIDE_SELECTOR_VALUE: "~slide-selector-value",
  SLIDE_SELECTOR_VALUE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SWITCH_SLIDER: "~Switch Slider",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsGeneralScreen extends SettingsBaseScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_GENERAL);
  }

  get accentColorButtonBlue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[4];
  }

  get accentColorButtonGreen() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[3];
  }

  get accentColorButtonGrey() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[7];
  }

  get accentColorButtonOrange() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[1];
  }

  get accentColorButtonPink() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[6];
  }

  get accentColorButtonRed() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[0];
  }

  get accentColorButtonViolet() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[5];
  }

  get accentColorButtonYellow() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$$(SELECTORS.ACCENT_COLOR_BUTTON)[2];
  }

  get appLanguageDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get appLanguageHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get appLanguageDropdown() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.DROPDOWN_MENU);
  }

  get clearAccentColorButton() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.CLEAR_ACCENT_COLOR_BUTTON);
  }

  get darkLightThemeToggle() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.DARK_LIGHT_THEME_TOGGLE);
  }

  get fontDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get fontHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get fontDropdown() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.DROPDOWN_MENU);
  }

  get fontScalingDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get fontScalingHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get fontScalingButtonMinus() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[2]
      .$(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_BUTTON_MINUS);
  }

  get fontScalingButtonPlus() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[2]
      .$(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_BUTTON_PLUS);
  }

  get fontScalingValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[2]
      .$(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_VALUE)
      .$(SELECTORS.SLIDE_SELECTOR_VALUE_TEXT);
  }

  get openFontsFolderButton() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.OPEN_FONTS_FOLDER_BUTTON);
  }

  get openThemesFolderButton() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.OPEN_THEMES_FOLDER_BUTTON);
  }

  get settingsGeneral() {
    return this.instance.$(SELECTORS.SETTINGS_GENERAL);
  }

  get settingsGeneralElementTooltip() {
    return this.instance.$(SELECTORS.SETTINGS_GENERAL).$(SELECTORS.TOOLTIP);
  }

  get settingsGeneralElementTooltipText() {
    return this.instance
      .$(SELECTORS.SETTINGS_GENERAL)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get slideSelector() {
    return this.instance.$(SELECTORS.SLIDE_SELECTOR);
  }

  get slideSelectorButtonMinus() {
    return this.instance
      .$(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_BUTTON_MINUS);
  }

  get slideSelectorButtonPlus() {
    return this.instance
      .$(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_BUTTON_PLUS);
  }

  get slideSelectorValue() {
    return this.instance
      .$(SELECTORS.SLIDE_SELECTOR)
      .$(SELECTORS.SLIDE_SELECTOR_VALUE)
      .$(SELECTORS.SLIDE_SELECTOR_VALUE_TEXT);
  }

  get themeDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get themeHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get themeDropdown() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.DROPDOWN_MENU);
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
      await this.instance
        .$$("-ios class chain:**/XCUIElementTypePopUpButton")[0]
        .addValue(language + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$$('[name="settings-control"]')[0]
        .addValue(language + "\uE007");
    }
  }

  async selectFont(font: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$$("-ios class chain:**/XCUIElementTypePopUpButton")[1]
        .addValue(font + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$$('[name="settings-control"]')[2]
        .addValue(font + "\uE007");
    }
  }

  async selectTheme(theme: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$$("-ios class chain:**/XCUIElementTypePopUpButton")[2]
        .addValue(theme + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$$('[name="settings-control"]')[1]
        .addValue(theme + "\uE007");
    }
  }

  // Hovering methods

  async hoverOnClearAccentColor() {
    const element = await this.clearAccentColorButton;
    await this.hoverOnElement(element);
  }

  async hoverOnOpenFontsFolder() {
    const element = await this.openFontsFolderButton;
    await this.hoverOnElement(element);
  }

  async hoverOnOpenThemesFolder() {
    const element = await this.openThemesFolderButton;
    await this.hoverOnElement(element);
  }
}
