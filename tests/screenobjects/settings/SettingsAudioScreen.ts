import { clickOnSwitchMacOS } from "../../helpers/commands";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import SettingsBaseScreen from "./SettingsBaseScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_AUDIO: "~settings-audio",
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

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsAudioScreen extends SettingsBaseScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SETTINGS_AUDIO);
  }

  get callTimerCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[3]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get callTimerControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[3]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get callTimerDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get callTimerHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get interfaceSoundsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[0]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get interfaceSoundsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[0]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get interfaceSoundsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get interfaceSoundsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get mediaSoundsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get mediaSoundsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get mediaSoundsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get mediaSoundsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get messageSoundsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[2]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get messageSoundsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[2]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get messageSoundsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get messageSoundsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsAudio() {
    return this.instance.$(SELECTORS.SETTINGS_AUDIO);
  }

  async clickOnCallTimer() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.callTimerCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const element = await this.callTimerCheckbox;
      await clickOnSwitchMacOS(element, this.executor);
    }
  }

  async clickOnInterfaceSounds() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.interfaceSoundsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const element = await this.interfaceSoundsCheckbox;
      await clickOnSwitchMacOS(element, this.executor);
    }
  }

  async clickOnMediaSounds() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.mediaSoundsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const element = await this.mediaSoundsCheckbox;
      await clickOnSwitchMacOS(element, this.executor);
    }
  }

  async clickOnMessageSounds() {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.messageSoundsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      const element = await this.messageSoundsCheckbox;
      await clickOnSwitchMacOS(element, this.executor);
    }
  }
}
