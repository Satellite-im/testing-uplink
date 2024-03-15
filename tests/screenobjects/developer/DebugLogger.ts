require("module-alias/register");
import { WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  DEBUG_LEVEL_BUTTON: '[name="debug-level-button"]',
  DEBUG_LOGGER: '[name="debug-logger"]',
  DEBUG_LOGGER_HEADER: '[name="debug-logger-header"]',
  DEBUG_LOGGER_NAV: '[name="debug-logger-nav"]',
  DEBUG_LOGGER_NAV_RIGHT: '[name="debug-logger-nav-right"]',
  ERROR_LEVEL_BUTTON: '[name="error-level-button"]',
  FILTER_SECTION: '[name="filter-section"]',
  FILTER_SECTION_LABEL: '[name="filter-label"]',
  INFO_LEVEL_BUTTON: '[name="info-level-button"]',
  INNER_TEXT: "<Text>",
  LOGS_BUTTON: '[name="logs-button"]',
  STATE_BUTTON: '[name="state-button"]',
  SWITCH_SLIDER: '[name="Switch Slider"]',
  SWITCH_SLIDER_VALUE: '[name="switch-slider-value"]',
  TRACE_LEVEL_BUTTON: '[name="trace-level-button"]',
  WEB_INSPECTOR_BUTTON: '[name="web-inspector-button"]',
};

const SELECTORS_MACOS = {
  DEBUG_LEVEL_BUTTON: "~debug-level-button",
  DEBUG_LOGGER: "~debug-logger",
  DEBUG_LOGGER_HEADER: "~debug-logger-header",
  DEBUG_LOGGER_NAV: "~debug-logger-nav",
  DEBUG_LOGGER_NAV_RIGHT: "~debug-logger-nav-right",
  ERROR_LEVEL_BUTTON: "~error-level-button",
  FILTER_SECTION: "~filter-section",
  FILTER_SECTION_LABEL: "~filter-label",
  INFO_LEVEL_BUTTON: "~info-level-button",
  INNER_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  LOGS_BUTTON: "~logs-button",
  STATE_BUTTON: "~state-button",
  SWITCH_SLIDER: "~Switch Slider",
  SWITCH_SLIDER_VALUE: "~switch-slider-value",
  TRACE_LEVEL_BUTTON: "~trace-level-button",
  WEB_INSPECTOR_BUTTON: "~web-inspector-button",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class DebugLogger extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.DEBUG_LOGGER);
  }

  public get debugLevelButton() {
    return this.filterSection.$(SELECTORS.DEBUG_LEVEL_BUTTON);
  }

  public get debugLogger() {
    return $(SELECTORS.DEBUG_LOGGER);
  }

  public get debugLoggerHeader() {
    return this.debugLogger.$("XCUIElementTypeOther");
  }

  public get debugLoggerNav() {
    return this.debugLoggerHeader.$(SELECTORS.DEBUG_LOGGER_NAV);
  }

  public get debugLoggerNavRight() {
    return this.debugLoggerHeader.$(SELECTORS.DEBUG_LOGGER_NAV_RIGHT);
  }

  public get debugLoggerNavRightThemeSwitch() {
    return this.debugLoggerNavRight.$(SELECTORS.SWITCH_SLIDER);
  }

  public get debugLoggerNavRightThemeSwitchValue() {
    return this.debugLoggerNavRightThemeSwitch.$(SELECTORS.SWITCH_SLIDER_VALUE);
  }

  public get errorLevelButton() {
    return this.filterSection.$(SELECTORS.ERROR_LEVEL_BUTTON);
  }

  public get filterSection() {
    return this.debugLoggerNav.$(SELECTORS.FILTER_SECTION);
  }

  public get filterSectionLabel() {
    return this.filterSection.$(SELECTORS.FILTER_SECTION_LABEL);
  }

  public get filterSectionLabelText() {
    return this.filterSectionLabel.$(SELECTORS.INNER_TEXT);
  }

  public get infoLevelButton() {
    return this.filterSection.$(SELECTORS.INFO_LEVEL_BUTTON);
  }

  public get logsButton() {
    return this.debugLoggerNav.$(SELECTORS.LOGS_BUTTON);
  }

  public get stateButton() {
    return this.debugLoggerNav.$(SELECTORS.STATE_BUTTON);
  }

  public get traceLevelButton() {
    return this.filterSection.$(SELECTORS.TRACE_LEVEL_BUTTON);
  }

  public get webInspectorButton() {
    return this.debugLoggerNav.$(SELECTORS.WEB_INSPECTOR_BUTTON);
  }

  async validateDebugLoggerIsDisplayed() {
    const debugLogger = this.debugLogger;
    await debugLogger.waitForExist();
  }

  async validateDebugLoggerIsNotDisplayed() {
    await this.debugLogger.waitForExist({ reverse: true });
  }
}

export default new DebugLogger();
