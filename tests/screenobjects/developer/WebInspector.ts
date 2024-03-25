require("module-alias/register");
import { WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {};

const SELECTORS_WINDOWS: selectorContainer = {
  CLOSE_BUTTON: '[name="Close"]',
  DOCK_TO_LEFT_BUTTON: '[name="Dock to left of window"]',
  DOCK_TO_RIGHT_BUTTON: '[name="Dock to right of window"]',
  DETACH_BUTTON: '[name="Detach into separate window"]',
  DEVICE_SETTINGS_BUTTON: '[name="Device Settings"]',
  WEB_INSPECTOR: '//Document/Button[@Name="Close"]',
};

const SELECTORS_MACOS: selectorContainer = {
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

class WebInspector extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.WEB_INSPECTOR);
  }

  public get closeButton() {
    return $(SELECTORS.CLOSE_BUTTON);
  }

  public get dockToLeftButton() {
    return $(SELECTORS.DOCK_TO_LEFT_BUTTON);
  }

  public get dockToRightButton() {
    return $(SELECTORS.DOCK_TO_RIGHT_BUTTON);
  }

  public get detachButton() {
    return $(SELECTORS.DETACH_BUTTON);
  }

  public get deviceSettingsButton() {
    return $(SELECTORS.DEVICE_SETTINGS_BUTTON);
  }

  public get webInspector() {
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

export default new WebInspector();
