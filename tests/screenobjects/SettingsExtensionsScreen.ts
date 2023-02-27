import { clickOnSwitchMacOS } from "../helpers/commands";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_EXTENSIONS: "~settings-extensions",
};

const SELECTORS_WINDOWS = {
  OPEN_EXTENSIONS_FOLDER_BUTTON: '[name="open-extensions-folder-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "//Text[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  OPEN_EXTENSIONS_FOLDER_BUTTON: "~open-extensions-folder-button",
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

  get enableAutomaticallyDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get enableAutomaticallyHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openExtensionsFolderButton() {
    return $(SELECTORS.OPEN_EXTENSIONS_FOLDER_BUTTON);
  }

  get settingsExtensions() {
    return $(SELECTORS.SETTINGS_EXTENSIONS);
  }

  async clickOnEnableAutomatically() {
    if ((await this.getCurrentDriver()) === "windows") {
      await this.enableAutomaticallyCheckbox.click();
    } else if ((await this.getCurrentDriver()) === "mac2") {
      await clickOnSwitchMacOS(await this.enableAutomaticallyCheckbox);
    }
  }

  async clickOnOpenExtensionsFolder() {
    await this.openExtensionsFolderButton.click();
  }
}

export default new SettingsExtensionsScreen();
