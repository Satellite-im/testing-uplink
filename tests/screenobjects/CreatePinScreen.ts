import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  UNLOCK_LAYOUT: "~unlock-layout",
};

const SELECTORS_WINDOWS = {
  CREATE_ACCOUNT_BUTTON: '[name="create-account-button"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "//Text",
  PIN_INPUT: "~unlock-input",
  UNLOCK_WARNING_PARAGRAPH: "//Text[2]",
};

const SELECTORS_MACOS = {
  CREATE_ACCOUNT_BUTTON: "~create-account-button",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  PIN_INPUT: "~pin-input",
  UNLOCK_WARNING_PARAGRAPH: "-ios class chain:**/XCUIElementTypeStaticText[2]",
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
    return this.inputError.$(SELECTORS.INPUT_ERROR_TEXT);
  }

  get pinInput() {
    return $(SELECTORS.PIN_INPUT);
  }

  get unlockLayout() {
    return $(SELECTORS.UNLOCK_LAYOUT);
  }

  get unlockWarningParagraph() {
    return $(SELECTORS.UNLOCK_LAYOUT).$(SELECTORS.UNLOCK_WARNING_PARAGRAPH);
  }

  async enterPin(pin: string) {
    await this.pinInput.setValue(pin);
  }

  async clickOnCreateAccount() {
    await (await this.createAccountButton).click();
  }

  async getStatusOfCreateAccountButton() {
    let result;
    if ((await this.getCurrentDriver()) === "windows") {
      result = await this.createAccountButton.getAttribute("IsEnabled");
    } else {
      result = await this.createAccountButton.getAttribute("enabled");
    }
    return result.toString().toLowerCase();
  }
}

export default new CreatePinScreen();
