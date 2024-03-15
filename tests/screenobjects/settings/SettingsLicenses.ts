require("module-alias/register");
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_LICENSES: "~settings-licenses",
};

const SELECTORS_WINDOWS = {
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  LICENSES_BUTTON: '[name="licenses-button"]',
  LICENSES_SECTION: '[name="licenses-section"]',
};

const SELECTORS_MACOS = {
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  LICENSES_BUTTON: "~licenses-button",
  LICENSES_SECTION: "~licenses-section",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SettingsLicensesScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_LICENSES);
  }

  public get licenseDescription() {
    return $(SELECTORS.LICENSES_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  public get licenseHeader() {
    return $(SELECTORS.LICENSES_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  public get licenseButton() {
    return $(SELECTORS.LICENSES_BUTTON);
  }

  async clickOnShowMITLicenses() {
    const licenseButton = await this.licenseButton;
    await licenseButton.click();
  }
}

export default new SettingsLicensesScreen();
