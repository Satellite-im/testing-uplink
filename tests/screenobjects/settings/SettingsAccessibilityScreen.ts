require("module-alias/register");
import { clickOnSwitchMacOS } from "@helpers/commands";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  OPEN_DYSLEXIC_SECTION: '[name="open-dyslexic-section"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  OPEN_DYSLEXIC_SECTION: "~open-dyslexic-section",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SWITCH_SLIDER: "~Switch Slider",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SettingsAccessibilityScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.OPEN_DYSLEXIC_SECTION);
  }

  public get openDyslexicCheckbox() {
    return this.openDyslexicSection
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SWITCH_SLIDER);
  }

  public get openDyslexicControllerValue() {
    return this.openDyslexicSection
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  public get openDyslexicDescription() {
    return this.openDyslexicSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  public get openDyslexicHeader() {
    return this.openDyslexicSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  public get openDyslexicSection() {
    return $(SELECTORS.OPEN_DYSLEXIC_SECTION);
  }

  async clickOnOpenDyslexic() {
    const currentDriver = await this.getCurrentDriver();
    const openDyslexicCheckbox = await this.openDyslexicCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await openDyslexicCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(openDyslexicCheckbox);
    }
  }

  async validateOpenDyslexicIsEnabled() {
    const openDyslexicControllerValue = await this.openDyslexicControllerValue;
    await this.validateToggleIsEnabled(openDyslexicControllerValue);
  }

  async validateOpenDyslexicIsDisabled() {
    const openDyslexicControllerValue = await this.openDyslexicControllerValue;
    await this.validateToggleIsDisabled(openDyslexicControllerValue);
  }
}

export default SettingsAccessibilityScreen;
