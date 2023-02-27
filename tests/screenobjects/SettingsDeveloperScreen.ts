import SettingsBaseScreen from "./SettingsBaseScreen";
import { join } from "path";
import { clickOnSwitchMacOS } from "../helpers/commands";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_DEVELOPER: "~settings-developer",
};

const SELECTORS_WINDOWS = {
  CLEAR_CACHE_BUTTON: '[name="clear-button"]',
  COMPRESS_BUTTON: '[name="compress-button"]',
  OPEN_CACHE_FOLDER_BUTTON: '[name="open-cache-folder-button"]',
  OPEN_CODEBASE_BUTTON: '[name="open-codebase-button"]',
  PRINT_STATE_BUTTON: '[name="print-state-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "//Text[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
  TEST_NOTIFICATIONS_BUTTON: '[name="test-notifications-button"]',
};

const SELECTORS_MACOS = {
  CLEAR_CACHE_BUTTON: "~clear-button",
  COMPRESS_BUTTON: "~compress-button",
  OPEN_CACHE_FOLDER_BUTTON: "~open-cache-folder-button",
  OPEN_CODEBASE_BUTTON: "~open-codebase-button",
  PRINT_STATE_BUTTON: "~print-state-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
  SWITCH_SLIDER: "~Switch Slider",
  TEST_NOTIFICATIONS_BUTTON: "~test-notifications-button",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SettingsDeveloperScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_DEVELOPER);
  }

  get clearCacheButton() {
    return $(SELECTORS.CLEAR_CACHE_BUTTON);
  }

  get clearCacheDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get clearCacheHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get compressAndDownloadCacheButton() {
    return $(SELECTORS.COMPRESS_BUTTON);
  }

  get compressAndDownloadCacheDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get compressAndDownloadCacheHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get developerModeCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get developerModeControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get developerModeDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get developerModeHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openCacheButton() {
    return $(SELECTORS.OPEN_CACHE_FOLDER_BUTTON);
  }

  get openCacheDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openCacheHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openCodebaseButton() {
    return $(SELECTORS.OPEN_CODEBASE_BUTTON);
  }

  get openCodebaseDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openCodebaseHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get printStateButton() {
    return $(SELECTORS.PRINT_STATE_BUTTON);
  }

  get printStateDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get printStateHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get saveLogsCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[7].$(SELECTORS.SWITCH_SLIDER);
  }

  get saveLogsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[7].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get saveLogsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[7]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get saveLogsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[7]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsDeveloper() {
    return $(SELECTORS.SETTINGS_DEVELOPER);
  }

  get testNotificationButton() {
    return $(SELECTORS.TEST_NOTIFICATIONS_BUTTON);
  }

  get testNotificationDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get testNotificationHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  async clickOnClearCache() {
    await this.clearCacheButton.click();
  }

  async clickOnCompressAndDownloadCache() {
    await this.compressAndDownloadCacheButton.click();
  }

  async clickOnDeveloperMode() {
    if ((await this.getCurrentDriver()) === "windows") {
      await this.developerModeCheckbox.click();
    } else if ((await this.getCurrentDriver()) === "mac2") {
      await clickOnSwitchMacOS(await this.developerModeCheckbox);
    }
  }

  async clickOnOpenCache() {
    await this.openCacheButton.click();
  }

  async clickOnOpenCodebase() {
    await this.openCodebaseButton.click();
  }

  async clickOnPrintState() {
    await this.printStateButton.click();
  }

  async clickOnSaveLogs() {
    if ((await this.getCurrentDriver()) === "windows") {
      await this.saveLogsCheckbox.click();
    } else if ((await this.getCurrentDriver()) === "mac2") {
      await clickOnSwitchMacOS(await this.saveLogsCheckbox);
    }
  }

  async clickOnTestNotifications() {
    await this.testNotificationButton.click();
  }

  async returnToApp() {
    if ((await this.getCurrentDriver()) === "mac2") {
      await driver.executeScript("macos: launchApp", [
        {
          bundleId: "im.satellite.uplink",
        },
      ]);
    } else if ((await this.getCurrentDriver()) === "windows") {
      await driver.executeScript("windows: launchApp", [
        {
          app: join(process.cwd(), "\\apps\\ui.exe"),
        },
      ]);
    }
  }
}

export default new SettingsDeveloperScreen();
