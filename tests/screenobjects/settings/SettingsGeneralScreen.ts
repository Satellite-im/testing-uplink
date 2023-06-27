import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_GENERAL: "~settings-general",
};

const SELECTORS_WINDOWS = {
  CLEAR_THEME_BUTTON: '[name="clear-theme-button"]',
  DROPDOWN_MENU: "//ComboBox",
  DROPDOWN_OPTION: '[name="Selector Option"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "//Text[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SLIDE_SELECTOR: '[name="slide-selector"]',
  SLIDE_SELECTOR_BUTTON_MINUS: '[name="slide-selector-minus"]',
  SLIDE_SELECTOR_BUTTON_PLUS: '[name="slide-selector-plus"]',
  SLIDE_SELECTOR_VALUE: '[name="slide-selector-value"]',
  SLIDE_SELECTOR_VALUE_TEXT: "//Text",
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  CLEAR_THEME_BUTTON: "~clear-theme-button",
  DROPDOWN_MENU: "~Selector",
  DROPDOWN_OPTION: "~Selector Option",
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
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsGeneralScreen extends SettingsBaseScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_GENERAL);
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

  get settingsGeneral() {
    return this.instance.$(SELECTORS.SETTINGS_GENERAL);
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

  async clickOnAppLanguageDropdown() {
    await this.appLanguageDropdown.click();
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
}
