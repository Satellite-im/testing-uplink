require("module-alias/register");
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ABOUT_SECTION: '[name="about-info-section"]',
  CHECK_FOR_UPDATES_BUTTON: '[name="check-for-updates-button"]',
  MADE_IN_SECTION: '[name="made-in-section"]',
  OPEN_SOURCE_CODE_SECTION: '[name="open-codebase-section"]',
  OPEN_WEBSITE_SECTION: '[name="open-website-section"]',
  VERSION_SECTION: '[name="about-version-section"]',
  OPEN_SOURCE_CODE_BUTTON: '[name="open-codebase-button"]',
  OPEN_WEBSITE_BUTTON: '[name="open-website-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_CONTROL_TEXT: "<Text>",
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
};

const SELECTORS_MACOS = {
  ABOUT_SECTION: "~about-info-section",
  CHECK_FOR_UPDATES_BUTTON: "~check-for-updates-button",
  MADE_IN_SECTION: "~made-in-section",
  OPEN_SOURCE_CODE_SECTION: "~open-codebase-section",
  OPEN_WEBSITE_SECTION: "~open-website-section",
  VERSION_SECTION: "~about-version-section",
  OPEN_SOURCE_CODE_BUTTON: "~open-codebase-button",
  OPEN_WEBSITE_BUTTON: "~open-website-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_CONTROL_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsAboutScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.OPEN_WEBSITE_BUTTON);
  }

  get aboutDescription() {
    return $(SELECTORS.ABOUT_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get aboutHeader() {
    return $(SELECTORS.ABOUT_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get madeInDescription() {
    return $(SELECTORS.MADE_IN_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get madeInHeader() {
    return $(SELECTORS.MADE_IN_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get madeInText() {
    return $(SELECTORS.MADE_IN_SECTION)
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SETTINGS_CONTROL_TEXT);
  }

  get checkForUpdatesButton() {
    return $(SELECTORS.CHECK_FOR_UPDATES_BUTTON);
  }

  get openSourceCodeButton() {
    return $(SELECTORS.OPEN_SOURCE_CODE_BUTTON);
  }

  get openSourceDescription() {
    return $(SELECTORS.OPEN_SOURCE_CODE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openSourceHeader() {
    return $(SELECTORS.OPEN_SOURCE_CODE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get openWebsiteButton() {
    return $(SELECTORS.OPEN_WEBSITE_BUTTON);
  }

  get openWebsiteDescription() {
    return $(SELECTORS.OPEN_WEBSITE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openWebsiteHeader() {
    return $(SELECTORS.OPEN_WEBSITE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get versionDescription() {
    return $(SELECTORS.VERSION_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get versionHeader() {
    return $(SELECTORS.VERSION_SECTION)
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
