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
  CALL_TIMER_SECTION: '[name="call-timer-section"]',
  DROPDOWN_MENU: "<ComboBox>",
  DROPDOWN_OPTION: '[name="Selector Option"]',
  ECHO_CANCELLATION_SECTION: '[name="echo-cancellation-section"]',
  INPUT_DEVICE_SECTION: '[name="input-device-section"]',
  INTERFACE_SOUNDS_SECTION: '[name="interface-sounds-section"]',
  MEDIA_SOUNDS_SECTION: '[name="media-sounds-section"]',
  MESSAGE_SOUNDS_SECTION: '[name="message-sounds-section"]',
  OUTPUT_DEVICE_SECTION: '[name="output-device-section"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_CHECKBOX: '[name="switch-slider-value"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SELECTOR: '[name="Switch Slider"]',
  SLIDER: "<Slider>",
  SLIDER_VALUE_INDICATOR: "<Image>[1]",
  SLIDER_VALUE_TEXT: "<Text>",
  SWITCH_SLIDER: '[name="Switch Slider"]',
  TEST_DEVICE_INPUT_SECTION: "~test-device-input-section",
  TEST_DEVICE_OUTPUT_SECTION: "~test-device-output-section",
};

const SELECTORS_MACOS = {
  BUTTON: "-ios class chain:**/XCUIElementTypeButton",
  CALL_TIMER_SECTION: "~call-timer-section",
  DROPDOWN_MENU: "~Selector",
  DROPDOWN_OPTION: "~Selector Option",
  ECHO_CANCELLATION_SECTION: "~echo-cancellation-section",
  INPUT_DEVICE_SECTION: "~input-device-section",
  INTERFACE_SOUNDS_SECTION: "~interface-sounds-section",
  MEDIA_SOUNDS_SECTION: "~media-sounds-section",
  MESSAGE_SOUNDS_SECTION: "~message-sounds-section",
  OUTPUT_DEVICE_SECTION: "~output-device-section",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_CHECKBOX: "~switch-slider-value",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SLIDER: "-ios class chain:**/XCUIElementTypeSlider",
  SLIDER_VALUE_INDICATOR: "-ios class chain:**/XCUIElementTypeValueIndicator",
  SLIDER_VALUE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SWITCH_SLIDER: "~Switch Slider",
  TEST_DEVICE_INPUT_SECTION: "~test-device-input-section",
  TEST_DEVICE_OUTPUT_SECTION: "~test-device-output-section",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsAudioScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_AUDIO);
  }

  get callTimerCheckbox() {
    return $(SELECTORS.CALL_TIMER_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  get callTimerControllerValue() {
    return $(SELECTORS.CALL_TIMER_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get callTimerDescription() {
    return $(SELECTORS.CALL_TIMER_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get callTimerHeader() {
    return $(SELECTORS.CALL_TIMER_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get echoCancellationCheckbox() {
    return $(SELECTORS.ECHO_CANCELLATION_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  get echoCancellationControllerValue() {
    return $(SELECTORS.ECHO_CANCELLATION_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get echoCancellationDescription() {
    return $(SELECTORS.ECHO_CANCELLATION_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get echoCancellationHeader() {
    return $(SELECTORS.ECHO_CANCELLATION_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get inputDeviceDescription() {
    return $(SELECTORS.INPUT_DEVICE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get inputDeviceDropdown() {
    return $(SELECTORS.INPUT_DEVICE_SECTION).$(SELECTORS.DROPDOWN_MENU);
  }

  get inputDeviceDropdownOption() {
    return $(SELECTORS.INPUT_DEVICE_SECTION)
      .$(SELECTORS.DROPDOWN_MENU)
      .$$(SELECTORS.DROPDOWN_OPTION);
  }

  get inputDeviceHeader() {
    return $(SELECTORS.INPUT_DEVICE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get inputDeviceTestButton() {
    return $(SELECTORS.TEST_DEVICE_INPUT_SECTION).$(SELECTORS.BUTTON);
  }

  get interfaceSoundsCheckbox() {
    return $(SELECTORS.INTERFACE_SOUNDS_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  get interfaceSoundsControllerValue() {
    return $(SELECTORS.INTERFACE_SOUNDS_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get interfaceSoundsDescription() {
    return $(SELECTORS.INTERFACE_SOUNDS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get interfaceSoundsHeader() {
    return $(SELECTORS.INTERFACE_SOUNDS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get mediaSoundsCheckbox() {
    return $(SELECTORS.MEDIA_SOUNDS_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  get mediaSoundsControllerValue() {
    return $(SELECTORS.MEDIA_SOUNDS_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get mediaSoundsDescription() {
    return $(SELECTORS.MEDIA_SOUNDS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get mediaSoundsHeader() {
    return $(SELECTORS.MEDIA_SOUNDS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get messageSoundsCheckbox() {
    return $(SELECTORS.MESSAGE_SOUNDS_SECTION).$(SELECTORS.SWITCH_SLIDER);
  }

  get messageSoundsControllerValue() {
    return $(SELECTORS.MESSAGE_SOUNDS_SECTION).$(
      SELECTORS.SETTINGS_CONTROL_CHECKBOX,
    );
  }

  get messageSoundsDescription() {
    return $(SELECTORS.MESSAGE_SOUNDS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get messageSoundsHeader() {
    return $(SELECTORS.MESSAGE_SOUNDS_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get outputDeviceDescription() {
    return $(SELECTORS.OUTPUT_DEVICE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get outputDeviceDropdown() {
    return $(SELECTORS.OUTPUT_DEVICE_SECTION).$(SELECTORS.DROPDOWN_MENU);
  }

  get outputDeviceDropdownOption() {
    return $(SELECTORS.OUTPUT_DEVICE_SECTION)
      .$(SELECTORS.DROPDOWN_MENU)
      .$$(SELECTORS.DROPDOWN_OPTION);
  }

  get outputDeviceHeader() {
    return $(SELECTORS.OUTPUT_DEVICE_SECTION)
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get outputDeviceTestButton() {
    return $(SELECTORS.TEST_DEVICE_OUTPUT_SECTION).$(SELECTORS.BUTTON);
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

  // Validate toggle methods enabled
  async validateEchoCancellationIsEnabled() {
    const echoCancellationControllerValue =
      await this.echoCancellationControllerValue;
    await this.validateToggleIsEnabled(echoCancellationControllerValue);
  }

  async validateInterfaceSoundsIsEnabled() {
    const interfaceSoundsControllerValue =
      await this.interfaceSoundsControllerValue;
    await this.validateToggleIsEnabled(interfaceSoundsControllerValue);
  }

  async validateMediaSoundsIsEnabled() {
    const mediaSoundsControllerValue = await this.mediaSoundsControllerValue;
    await this.validateToggleIsEnabled(mediaSoundsControllerValue);
  }

  async validateMessageSoundsIsEnabled() {
    const messageSoundsControllerValue =
      await this.messageSoundsControllerValue;
    await this.validateToggleIsEnabled(messageSoundsControllerValue);
  }

  async validateCallTimerIsEnabled() {
    const callTimerControllerValue = await this.callTimerControllerValue;
    await this.validateToggleIsEnabled(callTimerControllerValue);
  }

  // Validate toggle methods disabled
  async validateEchoCancellationIsDisabled() {
    const echoCancellationControllerValue =
      await this.echoCancellationControllerValue;
    await this.validateToggleIsDisabled(echoCancellationControllerValue);
  }

  async validateInterfaceSoundsIsDisabled() {
    const interfaceSoundsControllerValue =
      await this.interfaceSoundsControllerValue;
    await this.validateToggleIsDisabled(interfaceSoundsControllerValue);
  }

  async validateMediaSoundsIsDisabled() {
    const mediaSoundsControllerValue = await this.mediaSoundsControllerValue;
    await this.validateToggleIsDisabled(mediaSoundsControllerValue);
  }

  async validateMessageSoundsIsDisabled() {
    const messageSoundsControllerValue =
      await this.messageSoundsControllerValue;
    await this.validateToggleIsDisabled(messageSoundsControllerValue);
  }

  async validateCallTimerIsDisabled() {
    const callTimerControllerValue = await this.callTimerControllerValue;
    await this.validateToggleIsDisabled(callTimerControllerValue);
  }
}
