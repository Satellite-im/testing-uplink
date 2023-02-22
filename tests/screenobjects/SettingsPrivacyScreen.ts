import SettingsBaseScreen from "./SettingsBaseScreen";

const SELECTORS = {
  BACKUP_PHRASE_BUTTON: "~clear-theme-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_PRIVACY: "~settings-privacy",
  SETTINGS_SECTION: "~settings-section",
};

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

  get settingsPrivacy() {
    return $(SELECTORS.SETTINGS_PRIVACY);
  }

  async clickOnBackupPhrase() {
    await this.backupPhraseButton.click();
  }
}

export default new SettingsPrivacyScreen();
