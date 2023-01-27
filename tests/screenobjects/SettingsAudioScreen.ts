import SettingsBaseScreen from './SettingsBaseScreen';

const SELECTORS = {
  SETTINGS_AUDIO: "~settings-audio",
};

class SettingsAudioScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_AUDIO);
  }

  get settingsGeneral() {
    return $(SELECTORS.SETTINGS_AUDIO);
  }
}

export default new SettingsAudioScreen();
