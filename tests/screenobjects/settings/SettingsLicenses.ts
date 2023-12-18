require("module-alias/register");
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_LICENSES: "~settings-licenses",
};

const SELECTORS_WINDOWS = {
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_BUTTON: "<Button>",
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
};

const SELECTORS_MACOS = {
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_BUTTON: "-ios class chain:**/XCUIElementTypeButton",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsLicensesScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_LICENSES);
  }

  get heroiconsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get heroiconsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get heroiconsButton() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SETTINGS_CONTROL_BUTTON);
  }

  async clickOnShowHeroiconsLicenses() {
    const heroiconsButton = await this.heroiconsButton;
    await heroiconsButton.click();
  }
}
