import { clickOnSwitchMacOS } from "../../helpers/commands";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_FILES: "~settings-files",
};

const SELECTORS_WINDOWS = {
  OPEN_SYNC_FOLDER_BUTTON: '[name="open-sync-folder-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "//Text[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  OPEN_SYNC_FOLDER_BUTTON: "~open-sync-folder-button",
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

class SettingsFilesScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_FILES);
  }

  get localSyncCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get localSyncControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get localSyncDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get localSyncHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openSyncFolderButton() {
    return $(SELECTORS.OPEN_SYNC_FOLDER_BUTTON);
  }

  get openSyncFolderDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openSyncFolderHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsFiles() {
    return $(SELECTORS.SETTINGS_FILES);
  }

  async clickOnLocalSync() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "windows") {
      await this.localSyncCheckbox.click();
    } else if (currentDriver === "mac2") {
      const locator = await this.localSyncCheckbox;
      await clickOnSwitchMacOS(locator);
    }
  }

  async clickOnOpenSyncFolder() {
    await this.openSyncFolderButton.click();
  }
}

export default new SettingsFilesScreen();
