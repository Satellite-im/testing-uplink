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
    return $$(SELECTORS.SETTINGS_CONTROL)[2].$(SELECTORS.SWITCH_SLIDER);
  }

  get callTimerControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[2].$(
      '//*[@label="Switch Slider"]/*[1]'
    );
  }

  get callTimerDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get callTimerHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get interfaceSoundsControllerButton() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get interfaceSoundsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      '//*[@label="Switch Slider"]/*[1]'
    );
  }

  get interfaceSoundsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get interfaceSoundsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(
      '//*[@label="settings-info"]/*[1]'
    );
  }

  get mediaSoundsControllerButton() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(SELECTORS.SWITCH_SLIDER);
  }

  get mediaSoundsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(
      '//*[@label="Switch Slider"]/*[1]'
    );
  }

  get mediaSoundsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(
      '//*[@label="settings-info"]/*[2]/*[1]'
    );
  }

  get mediaSoundsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(
      '//*[@label="settings-info"]/*[1]'
    );
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

  async clickOnInterfaceSounds() {
    await this.interfaceSoundsControllerButton.click();
  }

  async clickOnMediaSounds() {
    await this.mediaSoundsControllerButton.click();
  }
}

export default new SettingsAudioScreen();
