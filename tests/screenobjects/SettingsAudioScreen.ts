import SettingsBaseScreen from "./SettingsBaseScreen";

const SELECTORS = {
  SETTINGS_AUDIO: "~settings-audio",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_SECTION: "~settings-section",
  SWITCH_SLIDER: "~Switch Slider",
};

class SettingsAudioScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_AUDIO);
  }

  get callTimerControllerButton() {
    return $(SELECTORS.SETTINGS_CONTROL).$(SELECTORS.SWITCH_SLIDER);
  }

  get callTimerControllerValue() {
    return $(SELECTORS.SETTINGS_CONTROL).$('//*[@label="Switch Slider"]/*[1]');
  }

  get callTimerDescription() {
    return $(SELECTORS.SETTINGS_SECTION).$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get callTimerHeader() {
    return $(SELECTORS.SETTINGS_SECTION).$('//*[@label="settings-info"]/*[1]');
  }

  get settingsAudio() {
    return $(SELECTORS.SETTINGS_AUDIO);
  }

  get settingsControl() {
    return $(SELECTORS.SETTINGS_CONTROL);
  }

  get settingsInfo() {
    return $(SELECTORS.SETTINGS_INFO);
  }

  get settingsSection() {
    return $(SELECTORS.SETTINGS_SECTION);
  }

  get switchSlider() {
    return $(SELECTORS.SWITCH_SLIDER);
  }

  async clickOnCallTimer() {
    await this.callTimerControllerButton.click();
  }
}

export default new SettingsAudioScreen();
