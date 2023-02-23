import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_EXTENSIONS: "~settings-extensions",
};

const SELECTORS_WINDOWS = {
  EXTENSION_PLACEHOLDER_CONTROLLER_VALUE: "//CheckBox",
  EXTENSION_PLACEHOLDER_NAME: "//Text[1]",
  EXTENSION_PLACEHOLDER_SHORT_DESCRIPTION: "//Text[2]/Text",
  EXTENSION_PLACEHOLDER_LONG_DESCRIPTION: "//Text[4]",
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

  get enableAutomaticallyCheckbox() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get enableAutomaticallyControllerValue() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
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

  async clickOnEnableAutomatically() {
    await this.enableAutomaticallyCheckbox.click();
  }

  async clickOnOpenExtensionsFolder() {
    await this.openExtensionsFolderButton.click();
  }
}

export default new SettingsExtensionsScreen();
