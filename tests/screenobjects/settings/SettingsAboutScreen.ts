import "module-alias/register";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
import { USER_A_INSTANCE, WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ABOUT_SECTION: '//Group[@Name="settings-section"][1]',
  CHECK_FOR_UPDATES_BUTTON: '[name="check-for-updates-button"]',
  OPEN_SOURCE_CODE_SECTION: '//Group[@Name="settings-section"][4]',
  OPEN_WEBSITE_SECTION: '//Group[@Name="settings-section"][3]',
  VERSION_SECTION: '//Group[@Name="settings-section"][2]',
  OPEN_SOURCE_CODE_BUTTON: '[name="open-codebase-button"]',
  OPEN_WEBSITE_BUTTON: '[name="open-website-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
};

const SELECTORS_MACOS = {
  ABOUT_SECTION:
    '-ios class chain:**/XCUIElementTypeGroup[`label == "settings-section"`][1]',
  CHECK_FOR_UPDATES_BUTTON: "~check-for-updates-button",
  OPEN_SOURCE_CODE_SECTION:
    '-ios class chain:**/XCUIElementTypeGroup[`label == "settings-section"`][3]',
  OPEN_WEBSITE_SECTION:
    '-ios class chain:**/XCUIElementTypeGroup[`label == "settings-section"`][2]',
  VERSION_SECTION:
    '-ios class chain:**/XCUIElementTypeGroup[`label == "settings-section"`][4]',
  OPEN_SOURCE_CODE_BUTTON: "~open-codebase-button",
  OPEN_WEBSITE_BUTTON: "~open-website-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsAboutScreen extends SettingsBaseScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.OPEN_WEBSITE_BUTTON);
  }

  get aboutDescription() {
    return this.instance
      .$(SELECTORS.ABOUT_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get aboutHeader() {
    return this.instance
      .$(SELECTORS.ABOUT_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get checkForUpdatesButton() {
    return this.instance.$(SELECTORS.CHECK_FOR_UPDATES_BUTTON);
  }

  get openSourceCodeButton() {
    return this.instance.$(SELECTORS.OPEN_SOURCE_CODE_BUTTON);
  }

  get openSourceDescription() {
    return this.instance
      .$(SELECTORS.OPEN_SOURCE_CODE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openSourceHeader() {
    return this.instance
      .$(SELECTORS.OPEN_SOURCE_CODE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openWebsiteButton() {
    return this.instance.$(SELECTORS.OPEN_WEBSITE_BUTTON);
  }

  get openWebsiteDescription() {
    return this.instance
      .$(SELECTORS.OPEN_WEBSITE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openWebsiteHeader() {
    return this.instance
      .$(SELECTORS.OPEN_WEBSITE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get versionDescription() {
    return this.instance
      .$(SELECTORS.VERSION_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get versionHeader() {
    return this.instance
      .$(SELECTORS.VERSION_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  async clickOnCheckForUpdates() {
    const checkForUpdatesButton = await this.checkForUpdatesButton;
    await checkForUpdatesButton.click();
  }

  async clickOnOpenSourceCode() {
    const openSourceCodeButton = await this.openSourceCodeButton;
    await openSourceCodeButton.click();
  }

  async clickOnOpenWebsite() {
    const openWebsiteButton = await this.openWebsiteButton;
    await openWebsiteButton.click();
  }

  async unlockDeveloperSettings() {
    const versionNumber = await this.versionDescription;
    // click 10 times on versionNumber to unlock developer settings
    for (let i = 0; i < 10; i++) {
      await versionNumber.click();
    }
  }
}
