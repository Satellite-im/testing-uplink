import "module-alias/register";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
import { USER_A_INSTANCE, WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  OPEN_SOURCE_CODE_BUTTON: '[name="open-codebase-button"]',
  OPEN_WEBSITE_BUTTON: '[name="open-website-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
};

const SELECTORS_MACOS = {
  OPEN_SOURCE_CODE_BUTTON: "~open-codebase-button",
  OPEN_WEBSITE_BUTTON: "~open-website-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
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
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get aboutHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openSourceCodeButton() {
    return this.instance.$(SELECTORS.OPEN_SOURCE_CODE_BUTTON);
  }

  get openSourceDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openSourceHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openWebsiteButton() {
    return this.instance.$(SELECTORS.OPEN_WEBSITE_BUTTON);
  }

  get openWebsiteDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openWebsiteHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get versionDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get versionHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  async clickOnOpenSourceCode() {
    await this.openSourceCodeButton.click();
  }

  async clickOnOpenWebsite() {
    await this.openWebsiteButton.click();
  }
}
