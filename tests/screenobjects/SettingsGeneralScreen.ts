import SettingsBaseScreen from './SettingsBaseScreen';

const SELECTORS = {
  SETTINGS_GENERAL: "~settings-general",
};

class SettingsGeneralScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_GENERAL);
  }

  get settingsGeneral() {
    return $(SELECTORS.SETTINGS_GENERAL);
  }
}

export default new SettingsGeneralScreen();
