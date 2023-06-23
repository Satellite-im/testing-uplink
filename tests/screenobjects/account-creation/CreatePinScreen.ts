import UplinkMainScreen from "../UplinkMainScreen";
import { USER_A_INSTANCE, WINDOWS_DRIVER } from "../../helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  UNLOCK_LAYOUT: "~unlock-layout",
};

const SELECTORS_WINDOWS = {
  CREATE_ACCOUNT_BUTTON: '[name="create-account-button"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "//Text",
  PIN_INPUT: "~unlock-input",
  UNLOCK_IMAGE: "//Image[1]",
  UNLOCK_WARNING_HEADER: "//Text[1]/Text",
  UNLOCK_WARNING_PARAGRAPH: "//Text[2]",
};

const SELECTORS_MACOS = {
  CREATE_ACCOUNT_BUTTON: "~create-account-button",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  PIN_INPUT: "~pin-input",
  UNLOCK_IMAGE: "-ios class chain:**/XCUIElementTypeImage",
  UNLOCK_WARNING_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  UNLOCK_WARNING_PARAGRAPH:
    '//XCUIElementTypeStaticText[contains(@value, "this is used to encrypt")]',
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class CreatePinScreen extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.UNLOCK_LAYOUT);
  }

  get createAccountButton() {
    return this.instance.$(SELECTORS.CREATE_ACCOUNT_BUTTON);
  }

  get inputError() {
    return this.instance.$(SELECTORS.INPUT_ERROR);
  }

  get inputErrorText() {
    return this.inputError.$(SELECTORS.INPUT_ERROR_TEXT);
  }

  get pinInput() {
    return this.instance.$(SELECTORS.PIN_INPUT);
  }

  get unlockLayout() {
    return this.instance.$(SELECTORS.UNLOCK_LAYOUT);
  }

  get unlockImage() {
    return this.instance.$(SELECTORS.UNLOCK_LAYOUT).$(SELECTORS.UNLOCK_IMAGE);
  }

  get unlockWarningHeader() {
    return this.instance
      .$(SELECTORS.UNLOCK_LAYOUT)
      .$(SELECTORS.UNLOCK_WARNING_HEADER);
  }

  get unlockWarningParagraph() {
    return this.instance
      .$(SELECTORS.UNLOCK_LAYOUT)
      .$(SELECTORS.UNLOCK_WARNING_PARAGRAPH);
  }

  async enterPin(pin: string) {
    await this.pinInput.setValue(pin);
  }

  async clickOnCreateAccount() {
    await this.createAccountButton.click();
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
