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
}
