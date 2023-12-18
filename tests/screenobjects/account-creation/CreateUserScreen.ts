require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  UNLOCK_LAYOUT: "~unlock-layout",
  USERNAME_INPUT: "~username-input",
};

const SELECTORS_WINDOWS = {
  CREATE_ACCOUNT_BUTTON: '[name="create-account-button"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "<Text>",
};

const SELECTORS_MACOS = {
  CREATE_ACCOUNT_BUTTON: "~create-account-button",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class CreateUserScreen extends UplinkMainScreen {
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
    const currentDriver = await this.getCurrentDriver();
    const usernameInput = await this.usernameInput;
    await usernameInput.clearValue();
    await usernameInput.setValue(username);
    if (currentDriver === MACOS_DRIVER) {
      const usernameInputValue = await usernameInput.getValue();
      if (usernameInputValue !== username) {
        await this.enterUsername(username);
      }
    }
  }

  async clickOnCreateAccount() {
    const createAccountButton = await this.createAccountButton;
    await createAccountButton.click();
  }

  async getStatusOfCreateAccountButton() {
    let result;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      result = await this.createAccountButton.getAttribute("IsEnabled");
    } else {
      result = await this.createAccountButton.getAttribute("enabled");
    }
    return result.toString().toLowerCase();
  }
}
