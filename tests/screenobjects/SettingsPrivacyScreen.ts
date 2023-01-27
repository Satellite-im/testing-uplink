import SettingsBaseScreen from './SettingsBaseScreen';

const SELECTORS = {
  SETTINGS_PRIVACY: "~settings-privacy",
};

class SettingsPrivacyScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_PRIVACY);
  }

  get settingsGeneral() {
    return $(SELECTORS.SETTINGS_PRIVACY);
  }
}

export default new SettingsPrivacyScreen();
