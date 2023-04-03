import { clickOnSwitchMacOS } from "../helpers/commands";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
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
  SWITCH_SLIDER: "~Switch Slider",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SettingsGeneralScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_GENERAL);
  }

  get appLanguageDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get appLanguageHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get appLanguageDropdown() {
    return $$(SELECTORS.SETTINGS_SECTION)[4].$(SELECTORS.DROPDOWN_MENU);
  }

  get clearThemeButton() {
    return $(SELECTORS.CLEAR_THEME_BUTTON);
  }

  get fontDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get fontHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get fontDropdown() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(SELECTORS.DROPDOWN_MENU);
  }

  get settingsGeneral() {
    return $(SELECTORS.SETTINGS_GENERAL);
  }

  get resetThemeDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get resetThemeHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get themeDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get themeDropdown() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(SELECTORS.DROPDOWN_MENU);
  }

  get themeHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get uplinkOverlayCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get uplinkOverlayControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get uplinkOverlayDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get uplinkOverlayHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  async clickOnAppLanguageDropdown() {
    await this.appLanguageDropdown.click();
  }

  async clickOnFontDropdown() {
    await this.fontDropdown.click();
  }

  async clickOnResetTheme() {
    await this.clearThemeButton.click();
  }

  async clickOnThemeDropdown() {
    await this.themeDropdown.click();
  }

  async clickOnUplinkOverlay() {
    if ((await this.getCurrentDriver()) === "windows") {
      await this.uplinkOverlayCheckbox.click();
    } else if ((await this.getCurrentDriver()) === "mac2") {
      await clickOnSwitchMacOS(await this.uplinkOverlayCheckbox);
    }
  }

  async selectAppLanguage(language: string) {
    if ((await this.getCurrentDriver()) === "mac2") {
      await $$("-ios class chain:**/XCUIElementTypePopUpButton")[2].addValue(
        language + "\n"
      );
    } else if ((await this.getCurrentDriver()) === "windows") {
      await $$('[name="settings-control"]')[2].addValue(language + "\uE007");
    }
  }

  async selectFont(font: string) {
    if ((await this.getCurrentDriver()) === "mac2") {
      await $$("-ios class chain:**/XCUIElementTypePopUpButton")[1].addValue(
        font + "\n"
      );
    } else if ((await this.getCurrentDriver()) === "windows") {
      await $$('[name="settings-control"]')[1].addValue(font + "\uE007");
    }
  }

  async selectTheme(theme: string) {
    if ((await this.getCurrentDriver()) === "mac2") {
      await $$("-ios class chain:**/XCUIElementTypePopUpButton")[0].addValue(
        theme + "\n"
      );
    } else if ((await this.getCurrentDriver()) === "windows") {
      await $$('[name="settings-control"]')[0].addValue(theme + "\uE007");
    }
  }
}

export default new SettingsGeneralScreen();
