import { clickOnSwitchMacOS } from "../../helpers/commands";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_ACCESSIBILITY: "~settings-general",
};

const SELECTORS_WINDOWS = {
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "//Text[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
  SWITCH_SLIDER: "~Switch Slider",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsAccessibilityScreen extends SettingsBaseScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_AUDIO);
  }

  get openDyslexicCheckbox() {
    return this.instance
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get openDyslexicControllerValue() {
    return this.instance
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get openDyslexicDescription() {
    return this.instance
      .$(SELECTORS.SETTINGS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get openDyslexicHeader() {
    return this.instance
      .$(SELECTORS.SETTINGS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsAccessibility() {
    return this.instance.$(SELECTORS.SETTINGS_ACCESSIBILITY);
  }

  async clickOnOpenDyslexic() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "windows") {
      await this.openDyslexicCheckbox.click();
    } else if (currentDriver === "mac2") {
      const element = await this.openDyslexicCheckbox;
      await clickOnSwitchMacOS(element, this.executor);
    }
  }
}
