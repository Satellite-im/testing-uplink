import { MACOS_DRIVER, WINDOWS_DRIVER } from "../helpers/constants";
const robot = require("robotjs");
export default class AppScreen {
  public executor;
  private locator;

  constructor(executor: string, locator: string) {
    this.executor = executor;
    this.locator = locator;
  }

  get instance() {
    return browser.getInstance(this.executor);
  }

  async getCurrentDriver() {
    const currentDriver = await driver[this.executor].capabilities
      .automationName;
    return currentDriver;
  }

  async waitForIsShown(isShown = true): Promise<boolean | void> {
    return this.instance.$(this.locator).waitForDisplayed({
      reverse: !isShown,
    });
  }

  async typeOnElement(locator: WebdriverIO.Element, textToAdd: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await this.instance.$(locator).clearValue();
      await robot.typeStringDelayed(textToAdd, 200);
    } else if (currentDriver === MACOS_DRIVER) {
      await this.instance.$(locator).click();
      await this.instance.$(locator).setValue(textToAdd);
    }
  }
}
