import SettingsBaseScreen from "./SettingsBaseScreen";

const SELECTORS = {
  SETTINGS_AUDIO: "~settings-audio",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
  SWITCH_SLIDER: "~Switch Slider",
};

class SettingsAudioScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_AUDIO);
  }

  get callTimerCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[3].$(SELECTORS.SWITCH_SLIDER);
  }

  get callTimerControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[3].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get callTimerDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get callTimerHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get interfaceSoundsCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(SELECTORS.SWITCH_SLIDER);
  }

  get interfaceSoundsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[0].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get interfaceSoundsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get interfaceSoundsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get mediaSoundsCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(SELECTORS.SWITCH_SLIDER);
  }

  get mediaSoundsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[1].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get mediaSoundsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get mediaSoundsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get messageSoundsCheckbox() {
    return $$(SELECTORS.SETTINGS_CONTROL)[2].$(SELECTORS.SWITCH_SLIDER);
  }

  get messageSoundsControllerValue() {
    return $$(SELECTORS.SETTINGS_CONTROL)[2].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX
    );
  }

  get messageSoundsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get messageSoundsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsAudio() {
    return $(SELECTORS.SETTINGS_AUDIO);
  }

  async clickOnCallTimer() {
    await this.callTimerCheckbox.click();
  }

  async clickOnInterfaceSounds() {
    await this.interfaceSoundsCheckbox.click();
  }

  async clickOnMediaSounds() {
    await this.mediaSoundsCheckbox.click();
  }

  async clickOnMessageSounds() {
    await this.messageSoundsCheckbox.click();
  }
}

export default new SettingsAudioScreen();
