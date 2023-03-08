import { clickOnSwitchMacOS } from "../helpers/commands";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_EXTENSIONS: "~settings-extensions",
};

const SELECTORS_WINDOWS = {
  EXPLORE_BUTTON: '[name="explore-button"]',
  EXTENSIONS_SEARCH_HEADER: "//Text[2]/Text",
  EXTENSIONS_SEARCH_INPUT: '[name="extensions-search-input"]',
  EXTENSIONS_SETTINGS_BUTTON: '[name="settings-button"]',
  INSTALLED_ALERT_TEXT: "//Text[1]",
  INSTALLED_BUTTON: '[name="installed-button"]',
  OPEN_EXTENSIONS_DESCRIPTION_TEXT: "//Text[2]",
  OPEN_EXTENSIONS_FOLDER_BUTTON: '[name="open-extensions-folder-button"]',
  OPEN_EXTENSIONS_HEADER_TEXT: "Text[1]/Text",
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "//Text[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  EXPLORE_BUTTON: "~explore-button",
  EXTENSIONS_SEARCH_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[2]",
  EXTENSIONS_SEARCH_INPUT: "~extensions-search-input",
  EXTENSIONS_SETTINGS_BUTTON: "~settings-button",
  INSTALLED_ALERT_TEXT: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  INSTALLED_BUTTON: "~installed-button",
  OPEN_EXTENSIONS_DESCRIPTION_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  OPEN_EXTENSIONS_FOLDER_BUTTON: "~open-extensions-folder-button",
  OPEN_EXTENSIONS_HEADER_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText[1]",
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
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(SELECTORS.SWITCH_SLIDER);
  }

  get enableAutomaticallyControllerValue() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get enableAutomaticallyDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get enableAutomaticallyHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get exploreButton() {
    return $(SELECTORS.EXPLORE_BUTTON);
  }

  get extensionsSearchHeader() {
    return $(SELECTORS.SETTINGS_EXTENSIONS).$(
      SELECTORS.EXTENSIONS_SEARCH_HEADER
    );
  }

  get extensionsSearchInput() {
    return $(SELECTORS.EXTENSIONS_SEARCH_INPUT);
  }

  get extensionsSettingsButton() {
    return $(SELECTORS.SETTINGS_EXTENSIONS).$(
      SELECTORS.EXTENSIONS_SETTINGS_BUTTON
    );
  }

  get installedAlertText() {
    return $(SELECTORS.SETTINGS_EXTENSIONS).$(SELECTORS.INSTALLED_ALERT_TEXT);
  }

  get installedButton() {
    return $(SELECTORS.INSTALLED_BUTTON);
  }

  get openExtensionsDescriptionText() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.OPEN_EXTENSIONS_DESCRIPTION_TEXT);
  }

  get openExtensionsHeaderText() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.OPEN_EXTENSIONS_HEADER_TEXT);
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

  async clickOnExploreButton() {
    await this.exploreButton.click();
  }

  async clickOnExtensionsSettingsButton() {
    await this.extensionsSettingsButton.click();
  }

  async clickOnInstalledButton() {
    await this.installedButton.click();
  }

  async clickOnOpenExtensionsFolder() {
    await this.openExtensionsFolderButton.click();
  }
}

export default new SettingsExtensionsScreen();
