import SettingsBaseScreen from "./SettingsBaseScreen";

const SELECTORS = {
  OPEN_EXTENSIONS_FOLDER_BUTTON: "~open-extension-folder-button",
  SETTINGS_EXTENSIONS: "~settings-extensions",
  SWITCH_SLIDER: "~switch-slider",
};

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
      '//*[@label="switch-slider"]/*[1]'
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
