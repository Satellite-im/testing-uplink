import SettingsBaseScreen from './SettingsBaseScreen';

const SELECTORS = {
  SETTINGS_DEVELOPER: "~settings-developer",
};

class SettingsDeveloperScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_DEVELOPER);
  }

  get settingsGeneral() {
    return $(SELECTORS.SETTINGS_DEVELOPER);
  }
}

export default new SettingsDeveloperScreen();
