import "module-alias/register";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
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
    const locator = await this.instance.$(this.locator);
    return await locator.waitForDisplayed({
      reverse: !isShown,
    });
  }

  async typeOnElement(locator: WebdriverIO.Element, textToAdd: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await driver[this.executor].touchAction([
        { action: "press", element: locator },
      ]);
      await robot.typeStringDelayed(textToAdd, 500);
    } else if (currentDriver === MACOS_DRIVER) {
      const locator = await this.instance.$(this.locator);
      await locator.click();
      await locator.setValue(textToAdd);
    }
  }
}
