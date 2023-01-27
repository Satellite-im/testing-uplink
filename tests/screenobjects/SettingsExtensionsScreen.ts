import SettingsBaseScreen from './SettingsBaseScreen';

const SELECTORS = {
  SETTINGS_EXTENSIONS: "~settings-extensions",
};

class SettingsExtensionsScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_EXTENSIONS);
  }

  get settingsGeneral() {
    return $(SELECTORS.SETTINGS_EXTENSIONS);
  }
}

export default new SettingsExtensionsScreen();
