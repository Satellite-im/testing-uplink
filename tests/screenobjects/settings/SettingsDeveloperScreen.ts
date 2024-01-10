require("module-alias/register");
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
import { clickOnSwitchMacOS } from "@helpers/commands";
import {
  MACOS_BUNDLE_ID,
  MACOS_DRIVER,
  WINDOWS_DRIVER,
} from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_DEVELOPER: "~settings-developer",
};

const SELECTORS_WINDOWS = {
  CLEAR_CACHE_SECTION: '[name="clear-cache-section"]',
  CLEAR_CACHE_BUTTON: '[name="clear-button"]',
  COMPRESS_BUTTON: '[name="compress-button"]',
  COMPRESS_DOWNLOAD_CACHE_SECTION: '[name="compress-download-cache-section"]',
  DEVELOPER_MODE_SECTION: '[name="developer-mode-section"]',
  EXPERIMENTAL_FEATURES_SECTION: '[name="experimental-features-section"]',
  OPEN_CACHE_FOLDER_BUTTON: '[name="open-cache-folder-button"]',
  OPEN_CACHE_SECTION: '[name="open-cache-section"]',
  PRINT_STATE_BUTTON: '[name="print-state-button"]',
  PRINT_STATE_SECTION: '[name="print-state-section"]',
  SAVE_LOGS_SECTION: '[name="save-logs-section"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SWITCH_SLIDER: '[name="Switch Slider"]',
  TEST_NOTIFICATIONS_BUTTON: '[name="test-notifications-button"]',
  TEST_NOTIFICATION_SECTION: '[name="test-notifications-section"]',
};

const SELECTORS_MACOS = {
  CLEAR_CACHE_BUTTON: "~clear-button",
  CLEAR_CACHE_SECTION: "~clear-cache-section",
  COMPRESS_BUTTON: "~compress-button",
  COMPRESS_DOWNLOAD_CACHE_SECTION: "~compress-download-cache-section",
  DEVELOPER_MODE_SECTION: "~developer-mode-section",
  EXPERIMENTAL_FEATURES_SECTION: "~experimental-features-section",
  OPEN_CACHE_FOLDER_BUTTON: "~open-cache-folder-button",
  OPEN_CACHE_SECTION: "~open-cache-section",
  PRINT_STATE_BUTTON: "~print-state-button",
  PRINT_STATE_SECTION: "~print-state-section",
  SAVE_LOGS_SECTION: "~save-logs-section",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SWITCH_SLIDER: "~Switch Slider",
  TEST_NOTIFICATIONS_BUTTON: "~test-notifications-button",
  TEST_NOTIFICATION_SECTION: "~test-notifications-section",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsDeveloperScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_DEVELOPER);
  }

  get clearCacheButton() {
    return $(SELECTORS.CLEAR_CACHE_BUTTON);
  }

  get clearCacheDescription() {
    return $(SELECTORS.CLEAR_CACHE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get clearCacheHeader() {
    return $(SELECTORS.CLEAR_CACHE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get compressAndDownloadCacheButton() {
    return $(SELECTORS.COMPRESS_BUTTON);
  }

  get compressAndDownloadCacheDescription() {
    return $(SELECTORS.COMPRESS_DOWNLOAD_CACHE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get compressAndDownloadCacheHeader() {
    return $(SELECTORS.COMPRESS_DOWNLOAD_CACHE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get developerModeCheckbox() {
    return $(SELECTORS.DEVELOPER_MODE_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  get developerModeControllerValue() {
    return $(SELECTORS.DEVELOPER_MODE_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get developerModeDescription() {
    return $(SELECTORS.DEVELOPER_MODE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get developerModeHeader() {
    return $(SELECTORS.DEVELOPER_MODE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get experimentalFeaturesCheckbox() {
    return $(SELECTORS.EXPERIMENTAL_FEATURES_SECTION).$(
      SELECTORS.SWITCH_SLIDER,
    );
  }

  get experimentalFeaturesControllerValue() {
    return $(SELECTORS.EXPERIMENTAL_FEATURES_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get experimentalFeaturesDescription() {
    return $(SELECTORS.EXPERIMENTAL_FEATURES_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get experimentalFeaturesHeader() {
    return $(SELECTORS.EXPERIMENTAL_FEATURES_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openCacheButton() {
    return $(SELECTORS.OPEN_CACHE_FOLDER_BUTTON);
  }

  get openCacheDescription() {
    return $(SELECTORS.OPEN_CACHE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openCacheHeader() {
    return $(SELECTORS.OPEN_CACHE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get printStateButton() {
    return $(SELECTORS.PRINT_STATE_BUTTON);
  }

  get printStateDescription() {
    return $(SELECTORS.PRINT_STATE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get printStateHeader() {
    return $(SELECTORS.PRINT_STATE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get saveLogsCheckbox() {
    return $(SELECTORS.SAVE_LOGS_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  get saveLogsControllerValue() {
    return $(SELECTORS.SAVE_LOGS_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get saveLogsDescription() {
    return $(SELECTORS.SAVE_LOGS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get saveLogsHeader() {
    return $(SELECTORS.SAVE_LOGS_SECTION)
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
    return $(SELECTORS.TEST_NOTIFICATION_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get testNotificationHeader() {
    return $(SELECTORS.TEST_NOTIFICATION_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  async clickOnClearCache() {
    const clearCacheButton = await this.clearCacheButton;
    await clearCacheButton.click();
  }

  async clickOnCompressAndDownloadCache() {
    const compressAndDownloadCacheButton =
      await this.compressAndDownloadCacheButton;
    await compressAndDownloadCacheButton.click();
  }

  async clickOnDeveloperMode() {
    const currentDriver = await this.getCurrentDriver();
    const developerModeCheckbox = await this.developerModeCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await developerModeCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(developerModeCheckbox);
    }
  }

  async clickOnOpenCache() {
    const openCacheButton = await this.openCacheButton;
    await openCacheButton.click();
  }

  async clickOnPrintState() {
    const printStateButton = await this.printStateButton;
    await printStateButton.click();
  }

  async clickOnSaveLogs() {
    const currentDriver = await this.getCurrentDriver();
    const saveLogsCheckbox = await this.saveLogsCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await saveLogsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(saveLogsCheckbox);
    }
  }

  async clickOnTestNotifications() {
    const testNotificationButton = await this.testNotificationButton;
    await testNotificationButton.click();
  }

  async returnToApp() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await driver.executeScript("macos: launchApp", [
        {
          bundleId: MACOS_BUNDLE_ID,
        },
      ]);
    } else if (currentDriver === WINDOWS_DRIVER) {
      const uplinkWindow = await driver.getWindowHandle();
      await driver.switchToWindow(uplinkWindow);
    }
  }
}
