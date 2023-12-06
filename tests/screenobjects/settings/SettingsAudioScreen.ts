require("module-alias/register");
import { clickOnSwitchMacOS } from "@helpers/commands";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_AUDIO: "~settings-audio",
};

const SELECTORS_WINDOWS = {
  DROPDOWN_MENU: "<ComboBox>",
  DROPDOWN_OPTION: '[name="Selector Option"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_SECTION: '[name="settings-section"]',
  SELECTOR: '[name="Switch Slider"]',
  SLIDER: "<Slider>",
  SLIDER_VALUE_INDICATOR: "<Image>[1]",
  SLIDER_VALUE_TEXT: "<Text>",
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
      .$$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get callTimerControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get callTimerDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get callTimerHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get echoCancellationCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get echoCancellationControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get echoCancellationDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get echoCancellationHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[2]
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

  get interfaceSoundsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get interfaceSoundsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get interfaceSoundsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get interfaceSoundsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[3]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get mediaSoundsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get mediaSoundsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get mediaSoundsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get mediaSoundsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get messageSoundsCheckbox() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get messageSoundsControllerValue() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_CONTROL_CHECKBOX);
  }

  get messageSoundsDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get messageSoundsHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get outputDeviceDescription() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get outputDeviceDropdown() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.DROPDOWN_MENU);
  }

  get outputDeviceDropdownOption() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.DROPDOWN_MENU)
      .$$(SELECTORS.DROPDOWN_OPTION);
  }

  get outputDeviceHeader() {
    return this.instance
      .$$(SELECTORS.SETTINGS_SECTION)[1]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get settingsAudio() {
    return this.instance.$(SELECTORS.SETTINGS_AUDIO);
  }

  // Click on dropdowns and sliders methods

  async clickOnInputDeviceDropdown() {
    const inputDeviceDropdown = await this.inputDeviceDropdown;
    await inputDeviceDropdown.click();
  }

  async clickOnCallTimer() {
    const currentDriver = await this.getCurrentDriver();
    const callTimerCheckbox = await this.callTimerCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await callTimerCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(callTimerCheckbox, this.executor);
    }
  }

  async clickOnEchoCancellation() {
    const currentDriver = await this.getCurrentDriver();
    const echoCancellationCheckbox = await this.echoCancellationCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await echoCancellationCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(echoCancellationCheckbox, this.executor);
    }
  }

  async clickOnInterfaceSounds() {
    const currentDriver = await this.getCurrentDriver();
    const interfaceSoundsCheckbox = await this.interfaceSoundsCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await interfaceSoundsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(interfaceSoundsCheckbox, this.executor);
    }
  }

  async clickOnMediaSounds() {
    const currentDriver = await this.getCurrentDriver();
    const mediaSoundsCheckbox = await this.mediaSoundsCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await mediaSoundsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(mediaSoundsCheckbox, this.executor);
    }
  }

  async clickOnMessageSounds() {
    const currentDriver = await this.getCurrentDriver();
    const messageSoundsCheckbox = await this.messageSoundsCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await messageSoundsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(messageSoundsCheckbox, this.executor);
    }
  }

  async clickOnOutputDeviceDropdown() {
    const outputDeviceDropdown = await this.outputDeviceDropdown;
    await outputDeviceDropdown.click();
  }

  // Input, Output and Sample Rate selection methods

  async selectInputDevice(device: string) {
    const currentDriver = await this.getCurrentDriver();
    const inputDeviceDropdown = await this.inputDeviceDropdown;
    if (currentDriver === MACOS_DRIVER) {
      await inputDeviceDropdown.addValue(device + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await inputDeviceDropdown.addValue(device + "\uE007");
    }
  }

  async selectOutputDevice(device: string) {
    const currentDriver = await this.getCurrentDriver();
    const outputDeviceDropdown = await this.outputDeviceDropdown;
    if (currentDriver === MACOS_DRIVER) {
      await outputDeviceDropdown.addValue(device + "\n");
    } else if (currentDriver === WINDOWS_DRIVER) {
      await outputDeviceDropdown.addValue(device + "\uE007");
    }
  }
}
