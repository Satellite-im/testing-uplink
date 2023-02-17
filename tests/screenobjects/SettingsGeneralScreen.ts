import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {};

const SELECTORS_MACOS = {
  CLEAR_THEME_BUTTON: "~clear-theme-button",
  DROPDOWN_MENU: "~Selector",
  DROPDOWN_OPTION: "~Selector Option",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_GENERAL: "~settings-general",
  SETTINGS_INFO: "~settings-info",
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
    return $$(SELECTORS.SETTINGS_SECTION)[4].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get appLanguageHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[4].$(
      '//*[@label="settings-info"]/*[1]'
    );
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
    return $$(SELECTORS.SETTINGS_SECTION)[3].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get resetThemeHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[3].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get splashScreenControllerButton() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(SELECTORS.SWITCH_SLIDER);
  }

  get splashScreenControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(
      '//*[@label="Switch Slider"]/*[1]'
    );
  }

  get splashScreenDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get splashScreenHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get themeDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get themeDropdown() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(SELECTORS.DROPDOWN_MENU);
  }

  get themeHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get uplinkOverlayControllerButton() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get uplinkOverlayControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      '//*[@label="Switch Slider"]/*[1]'
    );
  }

  get uplinkOverlayDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get uplinkOverlayHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(
      '//*[@label="settings-info"]/*[1]'
    );
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

  async selectAppLanguage(language: string) {
    await $$("-ios class chain:**/XCUIElementTypePopUpButton")[1].addValue(
      language + "\n"
    );
  }

  async selectTheme(theme: string) {
    await $$("-ios class chain:**/XCUIElementTypePopUpButton")[0].addValue(
      theme + "\n"
    );
  }
}

export default new SettingsGeneralScreen();
