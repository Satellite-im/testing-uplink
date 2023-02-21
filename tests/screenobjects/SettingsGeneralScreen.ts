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
  SETTINGS_CONTROL_CONTROLLER_VALUE: "//CheckBox",
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
  SETTINGS_CONTROL_CONTROLLER_VALUE:
    "-ios class chain:**/XCUIElementTypeCheckBox",
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

  get dropdownMenu() {
    return $(SELECTORS.DROPDOWN_MENU);
  }

  get dropdownOption() {
    return $(SELECTORS.DROPDOWN_OPTION);
  }

  get settingsControl() {
    return $(SELECTORS.SETTINGS_CONTROL);
  }

  get settingsGeneral() {
    return $(SELECTORS.SETTINGS_GENERAL);
  }

  get settingsInfo() {
    return $(SELECTORS.SETTINGS_INFO);
  }

  get settingsSection() {
    return $(SELECTORS.SETTINGS_SECTION);
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

  get splashScreenControllerButton() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(SELECTORS.SWITCH_SLIDER);
  }

  get splashScreenControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(
      SELECTORS.SETTINGS_CONTROL_CONTROLLER_VALUE
    );
  }

  get splashScreenDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get splashScreenHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get themeDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get themeDropdown() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(SELECTORS.DROPDOWN_MENU);
  }

  get themeHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get uplinkOverlayControllerButton() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get uplinkOverlayControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      SELECTORS.SETTINGS_CONTROL_CONTROLLER_VALUE
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

  get switchSlider() {
    return $(SELECTORS.SWITCH_SLIDER);
  }

  async clickOnAppLanguageDropdown() {
    await this.appLanguageDropdown.click();
  }

  async clickOnResetTheme() {
    await this.clearThemeButton.click();
  }

  async clickOnSplashScreen() {
    await this.splashScreenControllerButton.click();
  }

  async clickOnThemeDropdown() {
    await this.themeDropdown.click();
  }

  async clickOnUplinkOverlay() {
    await this.uplinkOverlayControllerButton.click();
  }

  async getCurrentSwitchValue(element: string) {
    let sliderResult;
    if (element === "Uplink Overlay") {
      sliderResult = await this.getSwitchSliderValueGlobal(
        this.uplinkOverlayControllerValue
      );
    } else if (element === "Splash Screen") {
      sliderResult = await this.getSwitchSliderValueGlobal(
        this.splashScreenControllerValue
      );
    }
    return sliderResult;
  }

  async selectAppLanguage(language: string) {
    const currentDriver = await driver.capabilities.automationName;
    if (currentDriver === "mac2") {
      await $$("-ios class chain:**/XCUIElementTypePopUpButton")[1].addValue(
        language + "\n"
      );
    } else if (currentDriver === "windows") {
      await $$('[name="settings-control"]')[1].addValue(language + "\n");
    }
  }

  async selectTheme(theme: string) {
    const currentDriver = await driver.capabilities.automationName;
    if (currentDriver === "mac2") {
      await $$("-ios class chain:**/XCUIElementTypePopUpButton")[0].addValue(
        theme + "\n"
      );
    } else if (currentDriver === "windows") {
      await $$('[name="settings-control"]')[0].addValue(theme + "\n");
    }
  }
}

export default new SettingsGeneralScreen();
