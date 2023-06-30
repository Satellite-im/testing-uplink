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
  DROPDOWN_MENU: "//ComboBox",
  DROPDOWN_OPTION: '[name="Selector Option"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "//Text[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SELECTOR: '[name="Switch Slider"]',
  SLIDER: "-ios class chain:**/XCUIElementTypeSlider",
  SLIDER_VALUE_INDICATOR: "-ios class chain:**/XCUIElementTypeValueIndicator",
  SLIDER_VALUE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SWITCH_SLIDER: '[name="Switch Slider"]',
};

const SELECTORS_MACOS = {
  DROPDOWN_MENU: "~Selector",
  DROPDOWN_OPTION: "~Selector Option",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_SECTION: "~settings-section",
  SLIDER: "-ios class chain:**/XCUIElementTypeSlider",
  SLIDER_VALUE_INDICATOR: "-ios class chain:**/XCUIElementTypeValueIndicator",
  SLIDER_VALUE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
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
      .$$(SELECTORS.SETTINGS_CONTROL)[8]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get callTimerControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[8]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get callTimerDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[8]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get callTimerHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[8]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get inputDeviceDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get inputDeviceDropdown() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.DROPDOWN_MENU);
  }

  get inputDeviceDropdownOption() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.DROPDOWN_MENU)
      .$$(SELECTORS.DROPDOWN_OPTION);
  }

  get inputDeviceHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get inputDeviceSlider() {
    return this.instance.$$(SELECTORS.SETTINGS_CONTROL)[1].$(SELECTORS.SLIDER);
  }
  get inputDeviceSliderValueIndicator() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SLIDER)
      .$(SELECTORS.SLIDER_VALUE_INDICATOR);
  }

  get inputDeviceSliderValueText() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[1]
      .$(SELECTORS.SLIDER_VALUE_TEXT);
  }

  get interfaceSoundsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[5]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get interfaceSoundsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[5]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get interfaceSoundsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get interfaceSoundsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get mediaSoundsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[6]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get mediaSoundsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[6]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get mediaSoundsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get mediaSoundsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get messageSoundsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[7]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get messageSoundsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[7]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get messageSoundsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[7]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get messageSoundsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[7]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get outputDeviceDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get outputDeviceDropdown() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.DROPDOWN_MENU);
  }

  get outputDeviceDropdownOption() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.DROPDOWN_MENU)
      .$$(SELECTORS.DROPDOWN_OPTION);
  }

  get outputDeviceHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get outputDeviceSlider() {
    return this.instance.$$(SELECTORS.SETTINGS_CONTROL)[3].$(SELECTORS.SLIDER);
  }

  get outputDeviceSliderValueIndicator() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[3]
      .$(SELECTORS.SLIDER)
      .$(SELECTORS.SLIDER_VALUE_INDICATOR);
  }

  get outputDeviceSliderValueText() {
    return this.instance
      .$$(SELECTORS.SETTINGS_CONTROL)[3]
      .$(SELECTORS.SLIDER_VALUE_TEXT);
  }

  get sampleRateDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get sampleRateDropdown() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.DROPDOWN_MENU);
  }

  get sampleRateDropdownOption() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.DROPDOWN_MENU)
      .$$(SELECTORS.DROPDOWN_OPTION);
  }

  get sampleRateHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsAudio() {
    return this.instance.$(SELECTORS.SETTINGS_AUDIO);
  }

  async clickOnInputDeviceDropdown() {
    await this.inputDeviceDropdown.click();
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

  async clickOnOutputDeviceDropdown() {
    await this.outputDeviceDropdown.click();
  }

  async clickOnSampleRateDropdown() {
    await this.sampleRateDropdown.click();
  }

  async selectInputDevice(device: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.inputDeviceDropdown.addValue(device + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.inputDeviceDropdown.addValue(device + "\uE007");
    }
  }

  async selectOutputDevice(device: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.outputDeviceDropdown.addValue(device + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.outputDeviceDropdown.addValue(device + "\uE007");
    }
  }

  async selectSampleRate(rate: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.sampleRateDropdown.addValue(rate + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.sampleRateDropdown.addValue(rate + "\uE007");
    }
  }
}
