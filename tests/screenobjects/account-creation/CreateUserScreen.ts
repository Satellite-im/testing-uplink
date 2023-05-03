import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
const { writeFileSync } = require("fs");
let SELECTORS = {};

const SELECTORS_COMMON = {
  UNLOCK_LAYOUT: "~unlock-layout",
  USERNAME_INPUT: "~username-input",
};

const SELECTORS_WINDOWS = {
  CREATE_ACCOUNT_BUTTON: '[name="create-account-button"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "//Text",
};

const SELECTORS_MACOS = {
  CREATE_ACCOUNT_BUTTON: "~create-account-button",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class CreatePinScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.UNLOCK_LAYOUT);
  }

  get createAccountButton() {
    return $(SELECTORS.CREATE_ACCOUNT_BUTTON);
  }

  get inputError() {
    return $(SELECTORS.INPUT_ERROR);
  }

  get inputErrorText() {
    return $(SELECTORS.INPUT_ERROR).$(SELECTORS.INPUT_ERROR_TEXT);
  }

  get unlockLayout() {
    return $(SELECTORS.UNLOCK_LAYOUT);
  }

  get usernameInput() {
    return $(SELECTORS.USERNAME_INPUT);
  }

  async enterUsername(username: string) {
    await this.usernameInput.setValue(username);
  }

  async clickOnCreateAccount() {
    await this.createAccountButton.click();
  }

  async getStatusOfCreateAccountButton() {
    let result;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "windows") {
      result = await this.createAccountButton.getAttribute("IsEnabled");
    } else {
      result = await this.createAccountButton.getAttribute("enabled");
    }
    return result.toString().toLowerCase();
  }
}

export default new CreatePinScreen();
