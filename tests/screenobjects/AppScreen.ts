export default class AppScreen {
  private selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  /**
   * Wait for the login screen to be visible
   *
   * @param {boolean} isShown
   */
  async waitForIsShown(isShown = true): Promise<boolean | void> {
    const currentDriver = await driver.capabilities.automationName;
    if (currentDriver === "mac2") {
      return $(this.selector).waitForDisplayed({
        reverse: !isShown,
      });
    } else if (currentDriver === "windows") {
      return $(this.selector).waitForDisplayed({
        reverse: !isShown,
        timeout: 60000,
      });
    }
  }
}
