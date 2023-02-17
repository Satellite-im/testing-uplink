import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {};

const SELECTORS_MACOS = {
  BACKUP_PHRASE_BUTTON: "~clear-theme-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_PRIVACY: "~settings-privacy",
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
    return $(SELECTORS.SETTINGS_SECTION).$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get backupPhraseHeader() {
    return $(SELECTORS.SETTINGS_SECTION).$('//*[@label="settings-info"]/*[1]');
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
