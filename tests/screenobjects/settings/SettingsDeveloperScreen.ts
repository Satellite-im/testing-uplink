import SettingsBaseScreen from "./SettingsBaseScreen";
import { clickOnSwitchMacOS } from "../../helpers/commands";
import {
  MACOS_BUNDLE_ID,
  MACOS_DRIVER,
  USER_A_INSTANCE,
  WINDOWS_DRIVER,
} from "../../helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_DEVELOPER: "~settings-developer",
};

const SELECTORS_WINDOWS = {
  CLEAR_CACHE_BUTTON: '[name="clear-button"]',
  COMPRESS_BUTTON: '[name="compress-button"]',
  OPEN_CACHE_FOLDER_BUTTON: '[name="open-cache-folder-button"]',
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

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsDeveloperScreen extends SettingsBaseScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_DEVELOPER);
  }

  get clearCacheButton() {
    return this.instance.$(SELECTORS.CLEAR_CACHE_BUTTON);
  }

  get clearCacheDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get clearCacheHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get compressAndDownloadCacheButton() {
    return this.instance.$(SELECTORS.COMPRESS_BUTTON);
  }

  get compressAndDownloadCacheDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get compressAndDownloadCacheHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get developerModeCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get developerModeControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get developerModeDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get developerModeHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get experimentalFeaturesCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[0]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get experimentalFeaturesControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[0]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get experimentalFeaturesDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get experimentalFeaturesHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openCacheButton() {
    return this.instance.$(SELECTORS.OPEN_CACHE_FOLDER_BUTTON);
  }

  get openCacheDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openCacheHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get printStateButton() {
    return this.instance.$(SELECTORS.PRINT_STATE_BUTTON);
  }

  get printStateDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get printStateHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get saveLogsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[7]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get saveLogsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[7]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get saveLogsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[7]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get saveLogsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[7]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsDeveloper() {
    return this.instance.$(SELECTORS.SETTINGS_DEVELOPER);
  }

  get testNotificationButton() {
    return this.instance.$(SELECTORS.TEST_NOTIFICATIONS_BUTTON);
  }

  get testNotificationDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get testNotificationHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
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
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.developerModeCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const element = await this.developerModeCheckbox;
      await clickOnSwitchMacOS(element, this.executor);
    }
  }

  async clickOnOpenCache() {
    await this.openCacheButton.click();
  }

  async clickOnPrintState() {
    await this.printStateButton.click();
  }

  async clickOnSaveLogs() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.saveLogsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const element = await this.saveLogsCheckbox;
      await clickOnSwitchMacOS(element, this.executor);
    }
  }

  async clickOnTestNotifications() {
    await this.testNotificationButton.click();
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
