require("module-alias/register");
import { clickOnSwitchMacOS } from "@helpers/commands";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_AUDIO: "~settings-audio",
};

const SELECTORS_WINDOWS = {
  BUTTON: "<Button>",
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
  BUTTON: "-ios class chain:**/XCUIElementTypeButton",
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

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsAudioScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_AUDIO);
  }

  get callTimerCheckbox() {
    return $$(SELECTORS.SETTINGS_SECTION)[8].$(SELECTORS.SWITCH_SLIDER);
  }

  get callTimerControllerValue() {
    return $$(SELECTORS.SETTINGS_SECTION)[8].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get callTimerDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[8]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get callTimerHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[8]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get echoCancellationCheckbox() {
    return $$(SELECTORS.SETTINGS_SECTION)[4].$(SELECTORS.SWITCH_SLIDER);
  }

  get echoCancellationControllerValue() {
    return $$(SELECTORS.SETTINGS_SECTION)[4].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get echoCancellationDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get echoCancellationHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[4]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get inputDeviceDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get inputDeviceDropdown() {
    return $$(SELECTORS.SETTINGS_SECTION)[0].$(SELECTORS.DROPDOWN_MENU);
  }

  get inputDeviceDropdownOption() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.DROPDOWN_MENU)
      .$$(SELECTORS.DROPDOWN_OPTION);
  }

  get inputDeviceHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[0]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get inputDeviceTestButton() {
    return $$(SELECTORS.SETTINGS_SECTION)[1].$(SELECTORS.BUTTON);
  }

  get interfaceSoundsCheckbox() {
    return $$(SELECTORS.SETTINGS_SECTION)[5].$(SELECTORS.SWITCH_SLIDER);
  }

  get interfaceSoundsControllerValue() {
    return $$(SELECTORS.SETTINGS_SECTION)[5].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get interfaceSoundsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get interfaceSoundsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[5]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get mediaSoundsCheckbox() {
    return $$(SELECTORS.SETTINGS_SECTION)[6].$(SELECTORS.SWITCH_SLIDER);
  }

  get mediaSoundsControllerValue() {
    return $$(SELECTORS.SETTINGS_SECTION)[6].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get mediaSoundsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get mediaSoundsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[6]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get messageSoundsCheckbox() {
    return $$(SELECTORS.SETTINGS_SECTION)[7].$(SELECTORS.SWITCH_SLIDER);
  }

  get messageSoundsControllerValue() {
    return $$(SELECTORS.SETTINGS_SECTION)[7].$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get messageSoundsDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[7]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get messageSoundsHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[7]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get outputDeviceDescription() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get outputDeviceDropdown() {
    return $$(SELECTORS.SETTINGS_SECTION)[2].$(SELECTORS.DROPDOWN_MENU);
  }

  get outputDeviceDropdownOption() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.DROPDOWN_MENU)
      .$$(SELECTORS.DROPDOWN_OPTION);
  }

  get outputDeviceHeader() {
    return $$(SELECTORS.SETTINGS_SECTION)[2]
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get outputDeviceTestButton() {
    return $$(SELECTORS.SETTINGS_SECTION)[3].$(SELECTORS.BUTTON);
  }

  get settingsAudio() {
    return $(SELECTORS.SETTINGS_AUDIO);
  }

  // Click on dropdowns and sliders methods

  async clickOnInputDeviceDropdown() {
    const inputDeviceDropdown = await this.inputDeviceDropdown;
    await inputDeviceDropdown.click();
  }

  async clickOnInputDeviceTestButton() {
    const inputDeviceTestButton = await this.inputDeviceTestButton;
    await inputDeviceTestButton.click();
  }

  async clickOnCallTimer() {
    const currentDriver = await this.getCurrentDriver();
    const callTimerCheckbox = await this.callTimerCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await callTimerCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(callTimerCheckbox);
    }
  }

  async clickOnEchoCancellation() {
    const currentDriver = await this.getCurrentDriver();
    const echoCancellationCheckbox = await this.echoCancellationCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await echoCancellationCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(echoCancellationCheckbox);
    }
  }

  async clickOnInterfaceSounds() {
    const currentDriver = await this.getCurrentDriver();
    const interfaceSoundsCheckbox = await this.interfaceSoundsCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await interfaceSoundsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(interfaceSoundsCheckbox);
    }
  }

  async clickOnMediaSounds() {
    const currentDriver = await this.getCurrentDriver();
    const mediaSoundsCheckbox = await this.mediaSoundsCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await mediaSoundsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(mediaSoundsCheckbox);
    }
  }

  async clickOnMessageSounds() {
    const currentDriver = await this.getCurrentDriver();
    const messageSoundsCheckbox = await this.messageSoundsCheckbox;
    if (currentDriver === WINDOWS_DRIVER) {
      await messageSoundsCheckbox.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(messageSoundsCheckbox);
    }
  }

  async clickOnOutputDeviceDropdown() {
    const outputDeviceDropdown = await this.outputDeviceDropdown;
    await outputDeviceDropdown.click();
  }

  async clickOnOutputDeviceTestButton() {
    const outputDeviceTestButton = await this.outputDeviceTestButton;
    await outputDeviceTestButton.click();
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
