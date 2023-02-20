import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_PRIVACY: "~settings-privacy",
};

const SELECTORS_WINDOWS = {
  BACKUP_PHRASE_BUTTON: '[name="clear-theme-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CONTROLLER_VALUE: "//CheckBox",
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "//Text[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
};

const SELECTORS_MACOS = {
  BACKUP_PHRASE_BUTTON: "~clear-theme-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CONTROLLER_VALUE:
    "-ios class chain:**/XCUIElementTypeCheckBox",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SettingsPrivacyScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_PRIVACY);
  }

  get backupPhraseButton() {
    return $(SELECTORS.BACKUP_PHRASE_BUTTON);
  }

  get backupPhraseDescription() {
    return $(SELECTORS.SETTINGS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get backupPhraseHeader() {
    return $(SELECTORS.SETTINGS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsControl() {
    return $(SELECTORS.SETTINGS_CONTROL);
  }

  get settingsInfo() {
    return $(SELECTORS.SETTINGS_INFO);
  }

  get settingsPrivacy() {
    return $(SELECTORS.SETTINGS_PRIVACY);
  }

  get settingsSection() {
    return $(SELECTORS.SETTINGS_SECTION);
  }

  async clickOnBackupPhrase() {
    await this.backupPhraseButton.click();
  }
}

export default new SettingsPrivacyScreen();
