import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {};

const SELECTORS_MACOS = {
  OPEN_EXTENSIONS_FOLDER_BUTTON: "~open-extension-folder-button",
  SETTINGS_EXTENSIONS: "~settings-extensions",
  SWITCH_SLIDER: "~Switch Slider",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SettingsExtensionsScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_EXTENSIONS);
  }

  get openExtensionsFolderButton() {
    return $(SELECTORS.OPEN_EXTENSIONS_FOLDER_BUTTON);
  }

  get settingsExtensions() {
    return $(SELECTORS.SETTINGS_EXTENSIONS);
  }

  get switchSlider() {
    return $(SELECTORS.SWITCH_SLIDER);
  }

  get extensionPlaceholderControllerButton() {
    return $(SELECTORS.SETTINGS_EXTENSIONS).$(SELECTORS.SWITCH_SLIDER);
  }

  get extensionPlaceholderControllerValue() {
    return $(SELECTORS.SETTINGS_EXTENSIONS).$(
      '//*[@label="Switch Slider"]/*[1]'
    );
  }

  get extensionPlaceholderLongDescription() {
    return $('//*[@label="settings-extensions"]/*[5]/*[1]');
  }

  get extensionPlaceholderName() {
    return $('//*[@label="settings-extensions"]/*[2]/*[1]');
  }

  get extensionPlaceholderShortDescription() {
    return $('//*[@label="settings-extensions"]/*[3]');
  }

  async clickOnExtensionPlaceholderButton() {
    await this.extensionPlaceholderControllerButton.click();
  }

  async clickOnOpenExtensionsFolder() {
    await this.openExtensionsFolderButton.click();
  }
}

export default new SettingsExtensionsScreen();
