import SettingsBaseScreen from "./SettingsBaseScreen";

const SELECTORS = {
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_NOTIFICATIONS: "~settings-notifications",
  SETTINGS_SECTION: "~settings-section",
  SWITCH_SLIDER: "~switch-slider",
};

class SettingsDeveloperScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_NOTIFICATIONS);
  }

  get settingsControl() {
    return $(SELECTORS.SETTINGS_CONTROL);
  }

  get settingsInfo() {
    return $(SELECTORS.SETTINGS_INFO);
  }

  get settingsNotifications() {
    return $(SELECTORS.SETTINGS_NOTIFICATIONS);
  }

  get settingsSection() {
    return $(SELECTORS.SETTINGS_SECTION);
  }

  get switchSlider() {
    return $(SELECTORS.SWITCH_SLIDER);
  }
}

export default new SettingsDeveloperScreen();
