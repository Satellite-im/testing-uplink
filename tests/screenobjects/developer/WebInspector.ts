require("module-alias/register");
import { WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CLOSE_BUTTON: '[name="Close"]',
  DOCK_TO_LEFT_BUTTON: '[name="Dock to left of window"]',
  DOCK_TO_RIGHT_BUTTON: '[name="Dock to right of window"]',
  DETACH_BUTTON: '[name="Detach into separate window"]',
  DEVICE_SETTINGS_BUTTON: '[name="Device Settings"]',
  WEB_INSPECTOR: '//Document/Button[@Name="Close"]',
};

const SELECTORS_MACOS = {
  CLOSE_BUTTON: "~Close",
  DOCK_TO_LEFT_BUTTON: "~Dock to left of window",
  DOCK_TO_RIGHT_BUTTON: "~Dock to right of window",
  DETACH_BUTTON: "~Detach into separate window",
  DEVICE_SETTINGS_BUTTON: "~Device Settings",
  WEB_INSPECTOR:
    '-ios class chain:**/XCUIElementTypeWebView/XCUIElementTypeButton[`label == "Close"`]',
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class WebInspector extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.WEB_INSPECTOR);
  }

  get closeButton() {
    return $(SELECTORS.CLOSE_BUTTON);
  }

  get dockToLeftButton() {
    return $(SELECTORS.DOCK_TO_LEFT_BUTTON);
  }

  get dockToRightButton() {
    return $(SELECTORS.DOCK_TO_RIGHT_BUTTON);
  }

  get detachButton() {
    return $(SELECTORS.DETACH_BUTTON);
  }

  get deviceSettingsButton() {
    return $(SELECTORS.DEVICE_SETTINGS_BUTTON);
  }

  get webInspector() {
    return $(SELECTORS.WEB_INSPECTOR);
  }

  async clickOnCloseButton() {
    const closeButton = this.closeButton;
    await closeButton.click();
  }

  async validateWebInspectorIsShown() {
    const webInspector = this.webInspector;
    await webInspector.waitForExist();
  }

  async validateWebInspectorIsNotShown() {
    await this.webInspector.waitForExist({ reverse: true });
  }
}
