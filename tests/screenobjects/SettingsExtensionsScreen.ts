import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_EXTENSIONS: "~settings-extensions",
};

const SELECTORS_WINDOWS = {
  EXTENSION_PLACEHOLDER_CONTROLLER_VALUE: "",
  EXTENSION_PLACEHOLDER_NAME: "",
  EXTENSION_PLACEHOLDER_SHORT_DESCRIPTION: "",
  EXTENSION_PLACEHOLDER_LONG_DESCRIPTION: "",
  OPEN_EXTENSIONS_FOLDER_BUTTON: '[name="open-extension-folder-button"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  EXTENSION_PLACEHOLDER_CONTROLLER_VALUE:
    "-ios class chain:**/XCUIElementTypeCheckBox",
  EXTENSION_PLACEHOLDER_NAME:
    "-ios class chain:**/XCUIElementTypeGroup[1]/XCUIElementTypeStaticText",
  EXTENSION_PLACEHOLDER_LONG_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup[3]/XCUIElementTypeStaticText",
  EXTENSION_PLACEHOLDER_SHORT_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeStaticText[1]",
  OPEN_EXTENSIONS_FOLDER_BUTTON: "~open-extension-folder-button",
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
    return $(SELECTORS.SETTINGS_EXTENSIONS)
      .$(SELECTORS.SWITCH_SLIDER)
      .$(SELECTORS.EXTENSION_PLACEHOLDER_CONTROLLER_VALUE);
  }

  get extensionPlaceholderLongDescription() {
    return $(SELECTORS.SETTINGS_EXTENSIONS).$(
      SELECTORS.EXTENSION_PLACEHOLDER_LONG_DESCRIPTION
    );
  }

  get extensionPlaceholderName() {
    return $(SELECTORS.SETTINGS_EXTENSIONS).$(
      SELECTORS.EXTENSION_PLACEHOLDER_NAME
    );
  }

  get extensionPlaceholderShortDescription() {
    return $(SELECTORS.SETTINGS_EXTENSIONS).$(
      SELECTORS.EXTENSION_PLACEHOLDER_SHORT_DESCRIPTION
    );
  }

  async clickOnExtensionPlaceholderButton() {
    await this.extensionPlaceholderControllerButton.click();
  }

  async clickOnOpenExtensionsFolder() {
    await this.openExtensionsFolderButton.click();
  }
}

export default new SettingsExtensionsScreen();
