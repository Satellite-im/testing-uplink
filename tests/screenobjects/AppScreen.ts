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
    if (currentDriver === "windows") {
      await driver[this.executor].touchAction([
        { action: "press", element: locator },
      ]);
      await robot.typeStringDelayed(textToAdd, 360);
    } else if (currentDriver === "mac2") {
      await this.instance.$(locator).click();
      await this.instance.$(locator).setValue(textToAdd);
    }
  }
}
