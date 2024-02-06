require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import SettingsBaseScreen from "@screenobjects/settings/SettingsBaseScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {
  SETTINGS_GENERAL: "~settings-general",
};

const SELECTORS_WINDOWS = {
  DECREASE_FONT_SIZE_SECTION: '[name="decrease-font-size-section"]',
  HIDE_FOCUS_UPLINK_SECTION: '[name="hide-focus-uplink-section"]',
  INCREASE_FONT_SIZE_SECTION: '[name="increase-font-size-section"]',
  KEYBIND_KEY: '[name="keybind-key"]',
  KEYBIND_KEY_INNER: '[name="keybind-key-inner"]',
  KEYBIND_KEY_INNER_TEXT: "<Text>",
  KEYBIND_SECTION_LABEL: '[name="keybind-section-label"]',
  KEYBIND_SECTION_LABEL_TEXT: "<Text>",
  KEYBIND_SECTION_KEYS: '[name="keybind-section-keys"]',
  KEYBIND_SEPARATOR: '[name="keybind-separator"]',
  OPEN_CLOSE_DEV_TOOLS_SECTION: '[name="open-close-dev-tools-section"]',
  RESET_KEYBINDS_SECTION: '[name="reset-keybinds-section"]',
  RESET_SINGLE_KEYBIND_BUTTON: '[name="reset-single-keybind-button"]',
  REVERT_KEYBINDS_BUTTON: '[name="revert-keybinds-button"]',
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_INFO: '[name="settings-info"]',
  SETTINGS_INFO_DESCRIPTION: "<Text>[2]",
  SETTINGS_INFO_HEADER: "//Text[1]/Text",
  SETTINGS_KEYBINDS: '[name="settings-keybinds"]',
  SETTINGS_KEYBINDS_INFO: '[name="settings-keybinds-info"]',
  SETTINGS_KEYBINDS_INFO_TEXT: '[name="settings-keybinds-info-text"]',
  SETTINGS_KEYBINDS_INFO_TEXT_VALUE: "<Text>",
  TOGGLE_DEAFEN_SECTION: '[name="toggle-deafen-section"]',
  TOGGLE_DEVMODE_SECTION: '[name="toggle-devmode-section"]',
  TOGGLE_MUTE_SECTION: '[name="toggle-mute-section"]',
};

const SELECTORS_MACOS = {
  DECREASE_FONT_SIZE_SECTION: "~decrease-font-size-section",
  HIDE_FOCUS_UPLINK_SECTION: "~hide-focus-uplink-section",
  INCREASE_FONT_SIZE_SECTION: "~increase-font-size-section",
  KEYBIND_KEY: "~keybind-key",
  KEYBIND_KEY_INNER: "~keybind-key-inner",
  KEYBIND_KEY_INNER_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  KEYBIND_SECTION_LABEL: "~keybind-section-label",
  KEYBIND_SECTION_LABEL_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  KEYBIND_SECTION_KEYS: "~keybind-section-keys",
  KEYBIND_SEPARATOR: "~keybind-separator",
  OPEN_CLOSE_DEV_TOOLS_SECTION: "~open-close-dev-tools-section",
  RESET_KEYBINDS_SECTION: "~reset-keybinds-section",
  RESET_SINGLE_KEYBIND_BUTTON: "~reset-single-keybind-button",
  REVERT_KEYBINDS_BUTTON: "~revert-keybinds-button",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_INFO: "~settings-info",
  SETTINGS_INFO_DESCRIPTION:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SETTINGS_INFO_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SETTINGS_KEYBINDS: "~settings-keybinds",
  SETTINGS_KEYBINDS_INFO: "~settings-keybinds-info",
  SETTINGS_KEYBINDS_INFO_TEXT: "~settings-keybinds-info-text",
  SETTINGS_KEYBINDS_INFO_TEXT_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  TOGGLE_DEAFEN_SECTION: "~toggle-deafen-section",
  TOGGLE_DEVMODE_SECTION: "~toggle-devmode-section",
  TOGGLE_MUTE_SECTION: "~toggle-mute-section",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SettingsKeybindsScreen extends SettingsBaseScreen {
  constructor() {
    super(SELECTORS.SETTINGS_KEYBINDS);
  }

  get decreaseFontSizeSection() {
    return this.settingsKeybinds.$(SELECTORS.DECREASE_FONT_SIZE_SECTION);
  }

  get hideFocusUplinkSection() {
    return this.settingsKeybinds.$(SELECTORS.HIDE_FOCUS_UPLINK_SECTION);
  }

  get increaseFontSizeSection() {
    return this.settingsKeybinds.$(SELECTORS.INCREASE_FONT_SIZE_SECTION);
  }

  get openCloseDevToolsSection() {
    return this.settingsKeybinds.$(SELECTORS.OPEN_CLOSE_DEV_TOOLS_SECTION);
  }

  get resetKeybindsSection() {
    return this.settingsKeybinds.$(SELECTORS.RESET_KEYBINDS_SECTION);
  }

  get resetKeybindsDescription() {
    return this.resetKeybindsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_DESCRIPTION);
  }

  get resetKeybindsHeader() {
    return this.resetKeybindsSection
      .$(SELECTORS.SETTINGS_INFO)
      .$(SELECTORS.SETTINGS_INFO_HEADER);
  }

  get revertKeybindsButton() {
    return this.resetKeybindsSection.$(SELECTORS.REVERT_KEYBINDS_BUTTON);
  }

  get settingsKeybinds() {
    return $(SELECTORS.SETTINGS_KEYBINDS);
  }

  get settingsKeybindsInfo() {
    return this.settingsKeybinds.$(SELECTORS.SETTINGS_KEYBINDS_INFO);
  }

  get settingsKeybindsInfoText() {
    return this.settingsKeybindsInfo.$(SELECTORS.SETTINGS_KEYBINDS_INFO_TEXT);
  }

  get settingsKeybindsInfoTextValue() {
    return this.settingsKeybindsInfoText.$(
      SELECTORS.SETTINGS_KEYBINDS_INFO_TEXT_VALUE,
    );
  }

  get toggleDeafenSection() {
    return this.settingsKeybinds.$(SELECTORS.TOGGLE_DEAFEN_SECTION);
  }

  get toggleDevmodeSection() {
    return this.settingsKeybinds.$(SELECTORS.TOGGLE_DEVMODE_SECTION);
  }

  get toggleMuteSection() {
    return this.settingsKeybinds.$(SELECTORS.TOGGLE_MUTE_SECTION);
  }
}
