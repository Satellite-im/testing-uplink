import SettingsBaseScreen from './SettingsBaseScreen';

const SELECTORS = {
  SETTINGS_FILES: "~settings-files",
};

class SettingsFilesScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_FILES);
  }

  get settingsGeneral() {
    return $(SELECTORS.SETTINGS_FILES);
  }
}

export default new SettingsFilesScreen();
